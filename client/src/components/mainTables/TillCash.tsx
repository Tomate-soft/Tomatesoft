import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';
import { useProcessOperationsStore } from '@/zstore/processOperations.store';
import { useEffect, useState } from 'react';
import ReturnArrowButton from '../customElements/returnArrowButton.tsx/returnArrowButton';
import { formatTempo } from '@/utils/tempoFormat';
import { formatToCurrency } from '@/lib/formatToCurrency';
import { DetailsButton } from '../customElements/detailsButton.tsx/detailsButton';
import checkIcon from '@/assets/public/buttonCheck.svg';
import acrossIcon from '@/assets/public/closeIcon.svg' ;

interface Props {
  element: any;
  setState?: () => void;
  children?: React.ReactNode;
  setSelectedElement: (element: any) => void;
  requests?: any;
}


export default function TillCashMainTable({ element, setState, children, selectedElement, setSelectedElement, requests }: Props) {
  const moneyMovements = element?.moneyMovements ?? [];
  const getTotalBills = useProcessOperationsStore(
    (state) => state.getTotalBills,
  );

  const getSellTotal = useProcessOperationsStore(
    (state) => state.getTotalCurrentSells,
  );
  const sellTotal = useProcessOperationsStore((state) => state.sellTotal);

  useEffect(() => {
    getTotalBills();
    getSellTotal();
  }, []);

  const tempo = formatTempo(element?.createdAt).split(' ');

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
                <th>Movimiento</th>
                <th>Estado</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Usuario</th>
                <th style={{width: "32px", padding:"0px 24px"}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {moneyMovements?.map((element) => {
                const type = element.type === 'income' ? 'Ingreso' : 'Egreso';
                const status = element.status === 'pending' ? 'Pendiente' : 'Completado';
                 return (
                   <tr
                    key={element._id}
                  >
                   <td>{type}</td>
                   <td>{status}</td>
                   <td>{element.title}</td>
                   <td>${formatToCurrency(element.amount)}</td>
                   <td>{element.user}</td>
                   <td style={{display: "flex", justifyContent: "end", alignItems:"center", padding:"8px", gap:"8PX"}}>{status !== "Pendiente" ? <DetailsButton onClick={()=> {}}/> : <>
                   <button style={{width: "fit-content"}} onClick={()=> {
                      setSelectedElement(element);
                      requests();
                   }}><img width={"16px"} src={checkIcon} alt="check-icon" /></button>
                   <button style={{width: "fit-content", backgroundColor: "#99000F"}} onClick={()=> {
                      setSelectedElement(element);
                      requests();
                   }}><img width={"15px"} src={acrossIcon} alt="check-icon" /></button>
                   </>}</td>
                  </tr>
                 )
              })}
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
