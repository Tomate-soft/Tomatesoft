import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';

import { useState } from 'react';
import ProductsCancelsTable from '../main/historialDeVentas/historicoDeCancelaciones/ProductsCancelsTable';
import NotesCancelsTable from '../main/historialDeVentas/historicoDeCancelaciones/NotesCancelsTable';
import BillCancelsTable from '../main/historialDeVentas/historicoDeCancelaciones/BillCancelsTable';
import { CancellationTypes } from '../main/historialDeVentas/historicoDeCancelaciones/types/cancellations.types';

interface Props {
  data: [];
}
export default function CancellationsMainTable({ data }: Props) {
  const [mode, setMode] = useState(CancellationTypes.BILL_CANCELATION);
  const billCancels = data.filter(
    (element) => !element.product && !element.noteId,
  );

  const notesCancels = data.filter(
    (element) => element.noteId && !element.product,
  );

  const productsCancels = data.filter((element) => element.product);

  const selectedCancels =
    mode === CancellationTypes.BILL_CANCELATION
      ? billCancels
      : mode === CancellationTypes.NOTES_CANCELATION
      ? notesCancels
      : mode === CancellationTypes.PRODUCTS_CANCELATION
      ? productsCancels
      : data;

  return (
    <div className={styles.container}>
      <div>
        <section className={styles.head}>
          <h2>Historial de cancelaciones</h2>
          <nav className={styles.switchMode}>
            <ul>
              <li
                className={
                  mode === CancellationTypes.BILL_CANCELATION
                    ? styles.active
                    : ''
                }
                onClick={() => setMode(CancellationTypes.BILL_CANCELATION)}
              >
                Cuentas
              </li>
              <li
                className={
                  mode === CancellationTypes.NOTES_CANCELATION
                    ? styles.active
                    : ''
                }
                onClick={() => setMode(CancellationTypes.NOTES_CANCELATION)}
              >
                Notas
              </li>
              <li
                className={
                  mode === CancellationTypes.PRODUCTS_CANCELATION
                    ? styles.active
                    : ''
                }
                onClick={() => setMode(CancellationTypes.PRODUCTS_CANCELATION)}
              >
                Productos
              </li>
            </ul>
          </nav>
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
          {mode === CancellationTypes.BILL_CANCELATION && (
            <BillCancelsTable selectedCancels={selectedCancels} />
          )}
          {mode === CancellationTypes.NOTES_CANCELATION && (
            <NotesCancelsTable selectedCancels={selectedCancels} />
          )}
          {mode === CancellationTypes.PRODUCTS_CANCELATION && (
            <ProductsCancelsTable selectedCancels={selectedCancels} />
          )}
          <div className={styles.tableFooter}></div>
        </section>
      </div>
    </div>
  );
}
