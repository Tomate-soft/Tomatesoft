import styles from './sellsInfo.module.css';

export default function SellsInfo() {
  return (
    <div className={styles.container}>
      <h3>Informe de ventas</h3>
      <ul>
        <li>
          <span>Método de pago</span>
          <span>Conteo de caja</span>
          <span> Declarado</span>
          <span>Diferencia</span>
        </li>
        <li>
          <span>Efectivo</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Tarjeta de débito</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Tarjeta de crédito</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Transferencía</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Rappi</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Uber Eats</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Didí Food</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
          <span>$000,000.00</span>
        </li>
      </ul>
      <footer>
        <span>Total</span>
        <span>$000,000.00</span>
        <span>$000,000.00</span>
        <span>$000,000.00</span>
      </footer>
    </div>
  );
}
