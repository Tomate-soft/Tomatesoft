import styles from './info.module.css';
interface Props {
  account: any;
}
export const AccountInfo = ({ account }: Props) => {
  return (
    <div className={styles.container}>
      <h3>Cuenta</h3>
      <ul>
        <li>
          <span>Nombre de la cuenta:</span>
          <span>{account.name}</span>
        </li>
        <li>
          <span>Numero de clientes:</span>
          <span>{account.diners}</span>
        </li>
        <li>
          <span>Numero de notas:</span>
          <span>{account.notes}</span>
        </li>
        <li>
          <span>Comentarios:</span>
          <span>{account.comments}</span>
        </li>
        <li>
          <span>Cantidad de productos:</span>
          <span>{account.products}</span>
        </li>
      </ul>
    </div>
  );
};
