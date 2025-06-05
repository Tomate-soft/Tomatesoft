import styles from './historicoDeCortesias.module.css';
import { formatCourtesy } from './utils/formatCourtesies';
import { billCourtesyHeaders } from './headers/billCourtesyHeaders';
interface Props {
  selectedCourtesy: any;
}
export default function BillCourtesyTable({ selectedCourtesy }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {billCourtesyHeaders.map(
              (header: { title: string; key: string }, index) => (
                <th key={index} className={styles.tHead}>
                  {header.title}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {selectedCourtesy?.map((element) => {
            const courtesy = formatCourtesy(element);
            return (
              <tr key={courtesy.code}>
                <td>#Pendiente</td>
                <td>{courtesy.code}</td>
                <td>{courtesy.sellType}</td>
                <td>{courtesy.mount}</td>
                <td>{courtesy.user}</td>
                <td>{courtesy.courtFor}</td>
                <td>{courtesy.reason}</td>
                <td>{courtesy.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
