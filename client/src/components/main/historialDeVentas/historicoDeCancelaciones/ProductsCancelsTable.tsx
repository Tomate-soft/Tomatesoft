import { productsCancelHeaders } from './headers/productsCancelHeaders';
import styles from '@/components/mainTables/tables.module.css';
import { formatCancellation } from './utils/formatCancellations';

interface Props {
  selectedCancels: any;
}

export default function ProductsCancelsTable({ selectedCancels }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {productsCancelHeaders.map((header) => {
              return (
                <th key={header.key} className={styles.tableHeaders}>
                  {header.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {selectedCancels?.map((element) => {
            const cancel = formatCancellation(element);
            return (
              <tr>
                <td>{cancel?.product}</td>
                <td>{cancel.code}</td>
                <td>{cancel?.note}</td>
                <td>{cancel.sellType}</td>
                <td>{cancel?.mount}</td>
                <td>{cancel.user}</td>
                <td>{cancel?.cancelTo}</td>
                <td>{cancel?.reason}</td>
                <td>{cancel?.creation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
