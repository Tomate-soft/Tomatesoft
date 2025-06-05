import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';

import { useState } from 'react';
import { DISCOUNT_TYPES } from '../main/historialDeVentas/historicoDeDescuentos/types/discounts.types';
import BillDiscountsTable from '../main/historialDeVentas/historicoDeDescuentos/BillDiscountsTable';
import ProductsDiscountsTable from '../main/historialDeVentas/historicoDeDescuentos/ProductsDiscountsTable';
import NotesDiscountsTable from '../main/historialDeVentas/historicoDeDescuentos/NotesDiscountsTable';

interface Props {
  data: [];
}

export default function DiscounstMainTable({ data }: Props) {
  const notesDiscounts = data.filter(
    (element) => element.discountType === DISCOUNT_TYPES.NOTES_DISCOUNT,
  );
  const productsDiscounts = data.filter(
    (element) => element.discountType === DISCOUNT_TYPES.PRODUCTS_DISCOUNT,
  );
  const billDiscounts = data.filter(
    (element) => element.discountType === DISCOUNT_TYPES.BILL_DISCOUNT,
  );
  const [mode, setMode] = useState(DISCOUNT_TYPES.BILL_DISCOUNT);

  const selectedDiscounts =
    mode === DISCOUNT_TYPES.ALL_DISCOUNTS
      ? data
      : mode === DISCOUNT_TYPES.NOTES_DISCOUNT
      ? notesDiscounts
      : mode === DISCOUNT_TYPES.PRODUCTS_DISCOUNT
      ? productsDiscounts
      : mode === DISCOUNT_TYPES.BILL_DISCOUNT
      ? billDiscounts
      : data;

  return (
    <div className={styles.container}>
      <div>
        <section className={styles.head}>
          <h2>Historial de descuentos</h2>
          <nav className={styles.switchMode}>
            <ul>
              <li
                className={
                  mode === DISCOUNT_TYPES.BILL_DISCOUNT ? styles.active : ''
                }
                onClick={() => setMode(DISCOUNT_TYPES.BILL_DISCOUNT)}
              >
                Cuentas
              </li>
              <li
                className={
                  mode === DISCOUNT_TYPES.NOTES_DISCOUNT ? styles.active : ''
                }
                onClick={() => setMode(DISCOUNT_TYPES.NOTES_DISCOUNT)}
              >
                Notas
              </li>
              <li
                className={
                  mode === DISCOUNT_TYPES.PRODUCTS_DISCOUNT ? styles.active : ''
                }
                onClick={() => setMode(DISCOUNT_TYPES.PRODUCTS_DISCOUNT)}
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
          {mode === DISCOUNT_TYPES.BILL_DISCOUNT && (
            <BillDiscountsTable selectedDiscounts={selectedDiscounts} />
          )}
          {mode === DISCOUNT_TYPES.PRODUCTS_DISCOUNT && (
            <ProductsDiscountsTable selectedDiscounts={selectedDiscounts} />
          )}
          {mode === DISCOUNT_TYPES.NOTES_DISCOUNT && (
            <NotesDiscountsTable selectedDiscounts={selectedDiscounts} />
          )}
          <div className={styles.tableFooter}></div>
        </section>
      </div>
    </div>
  );
}
