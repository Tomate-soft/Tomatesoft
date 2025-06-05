import styles from './tables.module.css';
//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';
import { useEffect, useState } from 'react';
import { DetailsButton } from '@/components/customElements/detailsButton.tsx/detailsButton';
import { AccountDetails } from '@/components/customElements/accountsDetails/accountDetails';
import { formatOrder } from '@/helpers/formatOrder';
import { ProcessingDetails } from '../main/historialDeVentas/historicoDeCuentas/types/process';
import { tableHeaders } from './constants';

interface Props {
  data: [];
}

export default function AccountsMainTable({ data }: Props): JSX.Element {
  // states
  const [showDetails, setShowDetails] = useState(ProcessingDetails.INITIAL);
  const [selectedAccount, setSelectedAccount] = useState({});

  // utils
  const handleDetails = (element: any) => {
    setShowDetails(ProcessingDetails.SHOW_DETAILS);
    setSelectedAccount(element);
  };
  useEffect(() => { 
    console.log(data)

  }, []);

  return (
    <>
      {showDetails === ProcessingDetails.INITIAL && (
        <div className={styles.container}>
          <div>
            <section className={styles.head}>
              <h2>Historial de cuentas</h2>
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
                    {tableHeaders.map((element, index) => {
                      return <th key={index}>{element}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data.map((element) => {
                    const account = formatOrder(element);
                    return (
                      <tr>
                        <td>{account.code}</td>
                        <td>{account.type}</td>
                        <td>{account.waiter}</td>
                        <td>{account.total}</td>
                        <td>{account.status}</td>
                        <td>{account.create}</td>
                        <td>
                          <DetailsButton
                            onClick={() => {
                              handleDetails(account);
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
        </div>
      )}
      {showDetails === ProcessingDetails.SHOW_DETAILS && (
        <AccountDetails
          account={selectedAccount}
          setState={() => {
            setShowDetails(ProcessingDetails.INITIAL);
          }}
        />
      )}
    </>
  );
}
