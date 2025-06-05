import styles from './historicoDeCancelaciones.module.css';
import { notesCancelHeaders } from './headers/notesCancelHeaders';
import { formatCancellation } from './utils/formatCancellations';
interface Props {
  selectedCancels: any;
}
export default function NotesCancelsTable({ selectedCancels }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {notesCancelHeaders.map((header) => {
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
            // Revisa si el estado del elemento no es 'disabled'
            // si si m uestra o no
            const cancel = formatCancellation(element);
            return (
              <tr>
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
