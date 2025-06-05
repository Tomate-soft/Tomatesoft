import styles from './info.module.css';

interface Props {
  discount: any;
}

export const DiscountInfo = ({ discount }: Props) => {
  return (
    <div className={styles.container}>
      <h3>Descuentos de la cuenta</h3>
      <ul>
        <li>
          <span>Realizado realizado por:</span>
          <span>{discount?.discountBy ?? '--'}</span>
        </li>
        <li>
          <span>Aplicado para:</span>
          <span>{discount?.discountFor ?? '--'}</span>
        </li>
        <li>
          <span>Motivo:</span>
          <span>{discount?.reason ?? '--'}</span>
        </li>
        <li>
          <span>Hora:</span>
          <span>{discount?.create ?? '--'}</span>
        </li>
        <li>
          <span>Monto del descuento:</span>
          <span>{discount?.mount ?? '--'}</span>
        </li>
      </ul>
    </div>
  );
};
