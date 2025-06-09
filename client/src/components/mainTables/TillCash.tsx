import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';
import eyeIcon from '@/assets/public/openEye.svg';
import enabledIcon from '@/assets/public/StatusIcon(enabled).svg';
import disabledIcon from '@/assets/public/StatusIcon(disabled).svg';
import pendingIcon from '@/assets/public/StatusIcon(pending).svg';
import { useProcessOperationsStore } from '@/zstore/processOperations.store';
import { useEffect, useState } from 'react';
import ReturnArrowButton from '../customElements/returnArrowButton.tsx/returnArrowButton';
import { formatTempo } from '@/utils/tempoFormat';
import { formatToCurrency } from '@/lib/formatToCurrency';
import IncomingForm from '../customElements/incomingButtons/incoming-form/IncomingForm';
interface Props {
  element: any;
  setState?: () => void;
  children?: React.ReactNode;
}


export default function TillCashMainTable({ element, setState, children }: Props) {
  const getTotalBills = useProcessOperationsStore(
    (state) => state.getTotalBills,
  );
  const getSellTotal = useProcessOperationsStore(
    (state) => state.getTotalCurrentSells,
  );
  const sellTotal = useProcessOperationsStore((state) => state.sellTotal);


  const tempo = formatTempo(element?.createdAt).split(' ');
    useEffect(() => {
    getTotalBills();
    getSellTotal();
    console.log(element)
  }, []);
  return (
    <div className={styles.container}>
      <div>
        <section className={styles.head}>
          <div>
            <ReturnArrowButton onClose={setState} />
            <h2>
              Caja chica - {tempo[0]} {tempo[1]} {tempo[2].slice(0, 4)}
            </h2>
            {children}
          </div>
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
                <th className={styles.tHeadCuenta}>Folio</th>
                <th className={styles.tHeadTipoDeVenta}>Concepto</th>
                <th className={styles.tHeadAbiertaPor}>Tipo</th>
                <th className={styles.tHeadTotal}> Total</th>
                <th className={styles.tHeadStatus}>Status</th>
                <th className={styles.tHeadFechaDeCreacion}>
                  Fecha de creacion
                </th>
                <th className={styles.tHeadFechaDePago}>Fecha de Pago</th>
                <th className={styles.tHeadDetalles}>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {element?.moneyMovements?.map((item, index) => {
                const { quantity, _id: folio,  operation } = item;
                return  (
                  <tr
                  key={index}
                  >
                    <td className={styles.tableRows}>{folio.slice(0, 6)}</td>
                    <td className={styles.tableRows}>#pending</td>
                    <td className={styles.tableRows}>{quantity}</td>
                    <td className={styles.tableRows}>{operation === "inflow" ? "Ingreso" : "Egreso"}</td>
                    <td className={styles.tableRows}>{element?.type}</td>
                  </tr>
                ) 
              }) }
            </tbody>
          </table>
          <div className={styles.tableFooter}></div>
        </section>
      </div>
      <footer>
        <div>
          <small>Periodo actual</small>
          <span>
            {tempo[0]} {tempo[1]} {tempo[2].slice(0, 4)}
          </span>
        </div>
        <div>
          <div>
            <small>Ingresos</small>
            <span>$200.00.00</span>
          </div>
          <div>
            <small>Egresos</small>
            <span>$200.00.00</span>
          </div>
          <div>
            <small>Saldo actual</small>
            <h4>${formatToCurrency(sellTotal)}</h4>
          </div>
        </div>
      </footer>
    </div>
  );
}
