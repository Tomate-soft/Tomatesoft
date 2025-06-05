import styles from './historicoDePeriodosOperativos.module.css';
import { ToastContainer } from 'react-toastify';

// Icons
import searchIcon from '../../../../assets/public/searchIcon.svg';
import periodCheck from '@/assets/public/periodCheck.svg';
import periodClose from '@/assets/public/periodWait.svg';
import filterIcon from '../../../../assets/public/filterIcon.svg';
import conflictIcon from '@/assets/public/periodWarning.svg';
import downloadIcon from '@/assets/public/download.svg';
import { useEffect, useState } from 'react';
import { OPERATING_PERIODS_TABLE_HEADERS } from './headers';
import OperatingClousureModal from './operatingClousure/operatingClousure';
import { Processing, State } from './operatingClousure/types';
import { formatTempo } from '@/utils/tempoFormat';
import addNotification from '@/components/toastNotification/notification';
import { generateOperatingPeriodReport } from '@/reportExporter/exportOperatingPeriod';
import { DetailsButton } from '@/components/customElements/detailsButton.tsx/detailsButton';
import TillCashMainTable from '@/components/mainTables/TillCash';
import { useOperatingPeriodStore } from '@/zstore/operatingPeriod.store';
import { formatToCurrency } from '@/lib/formatToCurrency';

export default function HistoricoDePeriodosOperativos() {
  const [processing, setProcessing] = useState(Processing.INITIAL);
  const [period, setPeriod] = useState(null); // Cambia a null
  const operatingPeriods = useOperatingPeriodStore(
    (state) => state.operatingPeriods,
  );
  const getOperatingPeriods = useOperatingPeriodStore(
    (state) => state.getOperatingPeriods,
  );

  useEffect(() => {
    getOperatingPeriods();
  }, [getOperatingPeriods]); // Añade dependencias si es necesario

  const handleDownload = (element) => {
    setPeriod(element);
    generateOperatingPeriodReport(element);
    addNotification('Reporte generado exitosamente');
  };

  return (
    <>
      {processing === Processing.SHOW_TILL_DETAILS && (
        <TillCashMainTable
          setState={() => setProcessing(Processing.INITIAL)}
          element={period}
        />
      )}
      {processing === Processing.CONFIRM_PROCESSING && (
        <OperatingClousureModal
          onClose={setProcessing}
          processing={processing}
          period={period}
        />
      )}
      {processing === Processing.INITIAL && (
        <div className={styles.container}>
          <section className={styles.head}>
            <h2>Historial de periodos operativos</h2>
          </section>
          <section className={styles.mainSection}>
            <div className={styles.mainHead}>
              <div className={styles.mainHeadLeft}>
                <span>Mostrar</span>
                <select className={styles.showSelect}>
                  <option value="all">Todos</option>
                  <option value="option-one">Opción 1</option>
                  <option value="option-two">Opción 2</option>
                </select>
                <span>Cuentas</span>
              </div>
              <div className={styles.searchContainer}>
                <button className={styles.categoryButton}>
                  <img src={filterIcon} alt="Botón de categorías" />
                  <span>Categorías</span>
                </button>
                <div className={styles.searchBarTable}>
                  <img
                    src={searchIcon}
                    alt="Icono de búsqueda"
                    className={styles.searchIcon}
                  />
                  <input
                    type="text"
                    className={styles.searchBarTableInput}
                    placeholder="Cuenta # Ejemplo-00"
                  />
                </div>
              </div>
            </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {OPERATING_PERIODS_TABLE_HEADERS.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {operatingPeriods.map((element) => (
                    <tr
                      key={element.code}
                      className={
                        element.status === 'disabled'
                          ? styles.rowDisabled
                          : styles.release
                      }
                    >
                      <td>{formatTempo(element.createdAt)}</td>
                      <td>{`$${formatToCurrency(element.operationalClousure?.totalSellsAmount ?? 0)}` ?? '$0.00'}</td>
                      <td>{formatTempo(element.createdAt)}</td>
                      <td className={styles.tableRows}>
                        {element.approvedBy
                          ? formatTempo(element.approvedBy.updatedAt)
                          : '--'}
                      </td>
                      <td>
                        {element.approvedBy
                          ? `${element.approvedBy.name} ${element.approvedBy.lastName}`
                          : '--'}
                      </td>
                      <td>
                        {element.operationalClousure?.state ===
                        State.APPROVED ? (
                          <button>
                            <img src={periodCheck} alt="Verificado" />
                          </button>
                        ) : (
                          <button
                            className={
                              element.operationalClousure?.state ===
                              State.CLOSED
                                ? styles.closedButton
                                : styles.conflictButton
                            }
                            onClick={() => {
                              setPeriod(element);
                              setProcessing(Processing.CONFIRM_PROCESSING);
                            }}
                          >
                            <img
                              src={
                                element.operationalClousure?.state ===
                                State.CLOSED
                                  ? periodClose
                                  : conflictIcon
                              }
                              alt="Estado del periodo"
                            />
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          disabled={
                            element.operationalClousure?.state !==
                            State.APPROVED
                          }
                          className={styles.downloadButton}
                          onClick={() => {
                            handleDownload(element)
                          }}
                        >
                          <img src={downloadIcon} alt="Descargar reporte" />
                        </button>
                      </td>
                      <td>
                        <DetailsButton
                          onClick={() => {
                            setProcessing(Processing.SHOW_TILL_DETAILS);
                            setPeriod(element);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            <div className={styles.tableFooter}></div>
          </section>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
