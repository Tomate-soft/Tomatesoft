import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';

import { formatTempo } from '@/utils/tempoFormat';
import { reopenHeaders } from './constants';
import formatSellType from '../main/utils/formatSellType';

interface Props {
  data: [];
}

export default function HistoricoDeReaperturas({ data }: Props) {
  return (
    <div className={styles.container}>
      <div>
        <section className={styles.head}>
          <h2>Historial de reaperturas</h2>
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
                {reopenHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((element) => (
                <tr
                  key={element.code}
                  className={
                    element.status === 'disabled'
                      ? styles.rowDisabled
                      : styles.release
                  }
                >
                  <td>{element?.accountId?.code}</td>
                  <td>{formatSellType(element?.accountId?.sellType)}</td>
                  <td>{`${element?.userId?.name} ${element?.userId?.lastName}`}</td>
                  <td>{formatTempo(element?.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.tableFooter}></div>
        </section>
      </div>
    </div>
  );
}
