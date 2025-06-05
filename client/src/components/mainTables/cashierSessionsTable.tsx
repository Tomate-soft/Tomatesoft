import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';

import { useState } from 'react';
import { cashierTableHeaders } from '../main/historialDeVentas/historicoDeCierresDeCaja/utils/headers';
import { DetailsButton } from '../customElements/detailsButton.tsx/detailsButton';
import SessionDetails from '../main/historialDeVentas/historicoDeCuentas/sessionDetails/sessionDetails';
import { formatCashierSession } from '../main/historialDeVentas/historicoDeCierresDeCaja/utils/formatCashierSession';
interface Props {
  data: [];
}
export default function CashierSessionMainTable({ data }: Props) {
  enum ProcessingDetails {
    INITIAL = 'initial',
    SHOW_DETAILS = 'showDetails',
  }

  const [showDetails, setShowDetails] = useState(ProcessingDetails.INITIAL);
  const [selectedSession, setSelectedSession] = useState({});

  return (
    <div className={styles.container}>
      {showDetails === ProcessingDetails.INITIAL && (
        <>
          <div>
            <section className={styles.head}>
              <h2>Historial de cierres de caja</h2>
            </section>
            <section className={styles.mainSection}>
              <div className={styles.mainHead}>
                <div className={styles.mainHeadLeft}>
                  <span>Mostrar</span>
                  <select name="" id="" className={styles.showSelect}>
                    <option value="all">Todos</option>
                    <option value="option-one">Option 1</option>
                    <option value="optio-two">Option 2</option>
                  </select>
                  <span>Cuentas</span>
                </div>
                <div className={styles.searchContainer}>
                  <button className={styles.categoryButton}>
                    <img src={filterIcon} alt="categories-button" />
                    <span>Categorias</span>
                  </button>
                  <div className={styles.searchBarTable}>
                    <img
                      src={searchIcon}
                      alt="search-icon"
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
                    {cashierTableHeaders.map((element) => {
                      return <th className={styles.tHeadCuenta}>{element}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data.map((element) => {
                    // Revisa si el estado del elemento no es 'disabled'
                    const cashier = formatCashierSession(element);
                    return (
                      <tr>
                        <td>{cashier.code}</td>
                        <td>{cashier.terminal}</td>
                        <td>{cashier.cashier}</td>
                        <td>{cashier.cash}</td>
                        <td>{cashier.difference}</td>
                        <td>{cashier.openDate}</td>
                        <td>{cashier.closeDate}</td>
                        <td>
                          <DetailsButton
                            onClick={() => {
                              setShowDetails(ProcessingDetails.SHOW_DETAILS);
                              setSelectedSession(cashier);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={styles.tableFooter}></div>
            </section>
          </div>
        </>
      )}
      {showDetails === ProcessingDetails.SHOW_DETAILS && (
        <SessionDetails
          setState={() => {
            setShowDetails(ProcessingDetails.INITIAL);
          }}
          session={selectedSession}
        />
      )}
    </div>
  );
}
