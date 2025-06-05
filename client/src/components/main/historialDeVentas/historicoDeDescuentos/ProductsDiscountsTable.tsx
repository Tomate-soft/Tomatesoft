import styles from './historicoDeDescuentos.module.css';
import { formatDiscount } from '@/utils/sellTypeDiscountFormat';
import { formatStatus } from '@/utils/formatStatus';
import { headersProducts } from './constants';
interface Props {
  selectedDiscounts: any;
}
export default function ProductsDiscountsTable({ selectedDiscounts }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headersProducts.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedDiscounts?.map((element) => {
            const formatedDiscount = formatDiscount(element);
            return (
              <tr key={element}>
                <td>{formatedDiscount?.product}</td>
                <td>{formatedDiscount?.code}</td>
                <td>{formatedDiscount?.note}</td>
                <td>{formatedDiscount?.sellType}</td>
                <td>{formatedDiscount?.total}</td>
                <td>{formatedDiscount?.mount}</td>
                <td>{formatedDiscount?.discountBy}</td>
                <td>{formatedDiscount?.reason}</td>
                <td>{formatStatus(formatDiscount(element)?.status)}</td>
                <td>{formatedDiscount?.create}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
