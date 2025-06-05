import styles from './info.module.css';
interface Props {
  account: any;
}
export const GeneralInfo = ({ account }: Props) => {
  return (
    <div className={styles.container}>
      <h3>General</h3>
      <ul>
        <li>
          <span>Fecha de creación:</span>
          <span>{account.create}</span>
        </li>
        <li>
          <span>Tipo de venta:</span>
          <span>{account.type}</span>
        </li>
        <li>
          <span>Mesa:</span>
          <span>{account.transfer}</span>
        </li>
        <li>
          <span>Abierta por:</span>
          <span>{account.waiter}</span>
        </li>
      </ul>
    </div>
  );
};
