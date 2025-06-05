import { formatDiscount } from '@/utils/sellTypeDiscountFormat';
import formatSellType from '../../utils/formatSellType';
import styles from './historicoDeDescuentos.module.css';
import { formatStatus } from '@/utils/formatStatus';
import { headers } from './constants';

interface Props {
  selectedDiscounts: any;
}

export default function BillDiscountsTable({ selectedDiscounts }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedDiscounts?.map((element) => {
            const formatedDiscount = formatDiscount(element);
            return (
              <tr key={element}>
                <td>{formatedDiscount?.code}</td>
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
