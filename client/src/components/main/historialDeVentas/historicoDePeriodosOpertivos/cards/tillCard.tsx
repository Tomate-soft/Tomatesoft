import styles from '../operatingClousure/operatingClousure.module.css';
import cardPeriodCheck from '@/assets/public/cardPeriodCheck.svg';
import cardPeriodWarning from '@/assets/public/cardPeriodWarning.svg';
import { TILL_ERROR_TEXT, TILL_OK_TEXT } from './texts';

interface Props {
  error: boolean;
  period: any;
}

export default function TillCard({ error, title, period }: Props) {
  return (
    <div
      className={styles.card}
      style={error ? {} : { borderLeft: '8px solid #74a016' }}
    >
      <img
        src={error ? cardPeriodWarning : cardPeriodCheck}
        alt="period-check-or-warning"
      />
      <div>
        {error && <h3>{`Caja no cerrada`}</h3>}
        <p>{error ? TILL_ERROR_TEXT : TILL_OK_TEXT}</p>
      </div>
      {error && <button>Cerrar caja</button>}
    </div>
  );
}
