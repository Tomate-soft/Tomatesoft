import styles from './general.module.css';

export default function General() {
  return (
    <div className={styles.container}>
      <h3>General</h3>

      <ul>
        <li>
          <span>Terminal</span>
          <span>#Todo</span>
        </li>
        <li>
          <span>Cajero</span>
          <span>***********</span>
        </li>
        <li>
          <span>Fecha de apertura</span>
          <span>***********</span>
        </li>
        <li>
          <span>Fecha de cierre</span>
          <span>**********</span>
        </li>
        <li>
          <span>Autorizado por</span>
          <span>#todo</span>
        </li>
        <li>
          <span>Cuentas cobradas</span>
          <span>**********</span>
        </li>
      </ul>
    </div>
  );
}
