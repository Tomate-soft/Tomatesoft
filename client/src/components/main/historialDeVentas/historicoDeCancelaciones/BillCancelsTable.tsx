import styles from './historicoDeCancelaciones.module.css';

import { billCancelHeaders } from './headers/billCancelHeaders';
import { useEffect } from 'react';
import { formatCancellation } from './utils/formatCancellations';
interface Props {
  selectedCancels: any;
}
export default function BillCancelsTable({ selectedCancels }: Props) {
  useEffect(() => {
    console.log(selectedCancels);
  }, [selectedCancels]);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {billCancelHeaders.map(
              (header: { title: string; key: string }, index) => (
                <th key={index} className={styles.tHead}>
                  {header.title}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {selectedCancels?.map((element, index) => {
            const cancel = formatCancellation(element);
            // Revisa si el estado del elemento no es 'disabled'
            return (
              <tr key={index}>
                <td>{cancel.code}</td>
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
