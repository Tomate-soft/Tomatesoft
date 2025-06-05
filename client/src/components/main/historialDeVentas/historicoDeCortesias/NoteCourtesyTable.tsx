import styles from './historicoDeCortesias.module.css';
import enabledIcon from '../../../../assets/public/StatusIcon(enabled).svg';
import disabledIcon from '../../../../assets/public/StatusIcon(disabled).svg';
import pendingIcon from '../../../../assets/public/StatusIcon(pending).svg';
import { formatCourtesy } from './utils/formatCourtesies';
import { useEffect } from 'react';
import { note } from 'pdfkit';
import { noteCourtesyHeaders } from './headers/billCourtesyHeaders';
interface Props {
  selectedCourtesy: any;
}

export default function NoteCourtesyTable({ selectedCourtesy }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {noteCourtesyHeaders.map(
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
                <td>{courtesy?.note}</td>
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
