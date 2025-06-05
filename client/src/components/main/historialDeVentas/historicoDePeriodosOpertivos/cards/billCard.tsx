import styles from '../operatingClousure/operatingClousure.module.css';
import cardPeriodCheck from '@/assets/public/cardPeriodCheck.svg';
import cardPeriodWarning from '@/assets/public/cardPeriodWarning.svg';
import { BILL_ERROR_TEXT, BILL_OK_TEXT } from './texts';

interface Props {
  error: boolean;
  period: any;
}

export default function BillCard({ error, period }: Props) {
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
        {error && <h3>{`Cuenta no cerrada`}</h3>}
        <p>{error ? BILL_ERROR_TEXT : BILL_OK_TEXT}</p>
      </div>
      {error && <button>Cancelar cuenta</button>}
    </div>
  );
}
