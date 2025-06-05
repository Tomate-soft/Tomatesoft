import CustomTable from '@/components/customElements/customTable/customTable';
import styles from './asistencias.module.css';
import LimitSelect from '@/components/customElements/customTable/LimitSelect/LimitSelect';
import searchIcon from '@/assets/public/searchIcon.svg';
import useDetail from '@/hooks/useDetail';
import { useState } from 'react';
import { formatContentDailyRegister } from './lib';
import ShiftDetails from './Details/shifDetails';

export default function Asistencias() {
  enum ShowModals {
    INITIAL = 'INITIAL',
    SHOW_DETAILS = 'SHOW_DETAILS',
  }
  const DAILY_REGISTER_URL = 'https://tomatesoft-server-paas.azurewebsites.net/daily-register';
  const headers = [
    'Usuario',
    'inicio de turno',
    'Inicio de descanso',
    'Fin de descanso',
    'Fin de turno',
    'Total de turno',
    'Total de descanso',
    'Editar',
  ];
  const [details, setDetails] = useState<ShowModals>(ShowModals.INITIAL);
  const [selectShift, setSelectShift] = useState({});
  const { data } = useDetail(DAILY_REGISTER_URL);
  const content = formatContentDailyRegister(data);

  return (
    <>
      <header className={styles.asis}>
        <h2>Asistencias</h2>
      </header>
      <CustomTable
        headers={headers}
        content={content}
        children={header()}
        detail={(element) => {
          setSelectShift(element);
          setDetails(ShowModals.SHOW_DETAILS);
        }}
      ></CustomTable>
      {details === ShowModals.SHOW_DETAILS && (
        <ShiftDetails
          onClose={() => setDetails(ShowModals.INITIAL)}
          content={selectShift}
        />
      )}
    </>
  );
}

function header() {
  return (
    <div className={styles.headerTable}>
      <div>
        <small>Mostrar</small>
        <LimitSelect />
        <small>Usuarios</small>
      </div>
      <div>
        <img src={searchIcon} alt="lupa" />
        <input type="text" placeholder="Buscar por nombre..." />
      </div>
    </div>
  );
}
