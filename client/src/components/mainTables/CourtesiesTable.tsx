import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';

import { useState } from 'react';
import { CourtesyTypes } from '../main/historialDeVentas/historicoDeCortesias/types/Courtesies.types';
import BillCourtesyTable from '../main/historialDeVentas/historicoDeCortesias/BillCourtesyTable';
import NoteCourtesyTable from '../main/historialDeVentas/historicoDeCortesias/NoteCourtesyTable';
import ProductCourtesyTable from '../main/historialDeVentas/historicoDeCortesias/ProductsCourtesyTable';

interface Props {
  data: [];
}

export default function CourtesiesMainTable({ data }: Props) {
  const [mode, setMode] = useState(CourtesyTypes.COURTESY_APPLY_BILLS);

  const billCourtesies = data.filter((element) => {
    return element.discountType === CourtesyTypes.COURTESY_APPLY_BILLS;
  });
  const notesCourtesies = data.filter((element) => {
    return element.discountType === CourtesyTypes.COURTESY_APPLY_NOTES;
  });
  const productsCourtesies = data.filter((element) => {
    return element.discountType === CourtesyTypes.COURTESY_APPLY_PRODUCTS;
  });

  const selectedCourtesies =
    mode === CourtesyTypes.COURTESY_APPLY_BILLS
      ? billCourtesies
      : mode === CourtesyTypes.COURTESY_APPLY_NOTES
      ? notesCourtesies
      : mode === CourtesyTypes.COURTESY_APPLY_PRODUCTS
      ? productsCourtesies
      : data;

  return (
    <div className={styles.container}>
      <div>
        <section className={styles.head}>
          <h2>Historial de Cortesias</h2>
          <nav className={styles.switchMode}>
            <ul>
              <li
                className={
                  mode === CourtesyTypes.COURTESY_APPLY_BILLS
                    ? styles.active
                    : ''
                }
                onClick={() => setMode(CourtesyTypes.COURTESY_APPLY_BILLS)}
              >
                Cuentas
              </li>
              <li
                className={
                  mode === CourtesyTypes.COURTESY_APPLY_NOTES
                    ? styles.active
                    : ''
                }
                onClick={() => setMode(CourtesyTypes.COURTESY_APPLY_NOTES)}
              >
                Notas
              </li>
              <li
                className={
                  mode === CourtesyTypes.COURTESY_APPLY_PRODUCTS
                    ? styles.active
                    : ''
                }
                onClick={() => setMode(CourtesyTypes.COURTESY_APPLY_PRODUCTS)}
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
          {mode === CourtesyTypes.COURTESY_APPLY_BILLS && (
            <BillCourtesyTable selectedCourtesy={selectedCourtesies} />
          )}
          {mode === CourtesyTypes.COURTESY_APPLY_NOTES && (
            <NoteCourtesyTable selectedCourtesy={selectedCourtesies} />
          )}
          {mode === CourtesyTypes.COURTESY_APPLY_PRODUCTS && (
            <ProductCourtesyTable selectedCourtesy={selectedCourtesies} />
          )}
          <div className={styles.tableFooter}></div>
        </section>
      </div>
    </div>
  );
}
