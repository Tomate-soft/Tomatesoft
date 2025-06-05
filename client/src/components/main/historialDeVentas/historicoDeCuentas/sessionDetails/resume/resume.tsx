import styles from './resume.module.css';

export default function Resume() {
  return (
    <div className={styles.container}>
      <h3>Resumen</h3>
      <ul>
        <li>
          <span>Movimientos</span>
          <span>Importe</span>
        </li>
        <li>
          <span>Apertura</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Efectivo</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Retiros</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Conteo de caja</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Declarado</span>
          <span>$000,000.00</span>
        </li>
        <li>
          <span>Diferencia</span>
          <span>$000,000.00</span>
        </li>
      </ul>
    </div>
  );
}
