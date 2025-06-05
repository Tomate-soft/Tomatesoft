import { useState } from 'react';
import { ATTENDANCE_HOURS_REPORT, adminReports } from '../libs';
import styles from './layout.module.css';
import { CUSTOM, PRE_SET } from './lib';
import DinamicReportsExporter from '@/components/customElements/exporters/DinamicReportsExporter/DinamicReportsExporter';
import { exportToExcel } from '@/components/customElements/exporters/DinamicReportsExporter/exportToXlsl';
import { formatDate } from '@/components/customElements/exporters/formatPeriodDate';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import { useReportsStore } from '@/zstore/reports.store';
import ConfirmReportsModal from '@/components/modals/confirmReportsPrint/confirmReportsPrint';

enum EShowModalOptions {
  INITIAL_STATE,
  DOWLOAD_REPORT
}

export default function AdminReports() {
  const [option, setOption] = useState(PRE_SET);
  const [showModal, setShowModal] = useState<EShowModalOptions>(EShowModalOptions.INITIAL_STATE);

  const [reportValue , setReportValue] = useState('');

  const confirmChanges = useModal(CONFIRM_CHANGES);
  const getReports = useReportsStore((state)=> state.getReports);
  const data = useReportsStore((state)=> state.data);
  const isLoading = useReportsStore((state)=> state.isLoading);
  const isError = useReportsStore((state)=> state.error);

  const config = {
    sheetName: `${formatDate(data?.period ?? '')}`,
    reportName: `Asistencia y horas. ${formatDate(data?.period ?? '')}`
  }

  const HEADER_MAPPING = {
    user: 'EMPLEADO',
    firstTime: 'ENTRADA',
    secondTime: 'DESCANSO',
    thirdTime: 'REGRESO',
    fourthTime: 'SALIDA',
    "workedTime.tiempoTotal": 'TIEMPO TOTAL',
    "workedTime.tiempoDescanso": 'TIEMPO DESCANSO'
  }
  
  const handleRequest = async () => {
    try {
      confirmChanges.openModal();
      await getReports();
    } catch (error) {
      console.error('Error al exportar:', error);
    }
  };

  const configState = {
    datePicker: false,
    timePicker: false,
    sellTypePicker: false,
    formatPicker: false
  }
  
  return (
    <div className={styles.container}>
      <div>
        <button
          onClick={() => {
            setOption(PRE_SET);
          }}
          style={
            option === PRE_SET
              ? {
                  background: 'rgba(249, 249, 249, 0.15)',
                  borderRadius: '16px 16px 0px 0px',
                }
              : {}
          }
        >
          Predeterminados
        </button>
        <button
          onClick={() => {
            setOption(CUSTOM);
          }}
          style={
            option === CUSTOM
              ? {
                  background: 'rgba(249, 249, 249, 0.15)',
                  borderRadius: '16px 16px 0px 0px',
                }
              : {}
          }
        >
          Personalizados
        </button>
      </div>
      {option === PRE_SET ? (
        <div
          style={
            option === PRE_SET ? { borderRadius: '0px 16px 16px 16px' } : {}
          }
        >
          {adminReports.map((element) => (
            <div onClick={() => {
              setShowModal(EShowModalOptions.DOWLOAD_REPORT);
              setReportValue(element.value);
            }}>
              <div>
                <img src={element.icon} alt="icon" />
              </div>
              <h4>{element.tittle}</h4>
            </div>
          ))}
        </div>
      ) : (
        <div>Customizables</div>
      )}     
      {
        showModal === EShowModalOptions.DOWLOAD_REPORT && reportValue === ATTENDANCE_HOURS_REPORT && <DinamicReportsExporter config={{...configState, datePicker: true}} request={handleRequest} onclose={() => setShowModal(EShowModalOptions.INITIAL_STATE)}>Asistencia y horas</DinamicReportsExporter>
      }
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
              <ConfirmReportsModal
                isOpen={confirmChanges.isOpen}
                onClose={confirmChanges.closeModal}
                loading={isLoading}
                errors={isError}
                actionType={() => {
                  exportToExcel(data?.workData ?? [], HEADER_MAPPING, config);
                }}
                isInteractive={true}
              >
                Reporte impreso correctamente
              </ConfirmReportsModal>
            ) : null}
    </div>
  );
}