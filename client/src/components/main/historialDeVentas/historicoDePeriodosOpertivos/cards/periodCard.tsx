import styles from '../operatingClousure/operatingClousure.module.css';
import cardPeriodCheck from '@/assets/public/cardPeriodCheck.svg';
import cardPeriodWarning from '@/assets/public/cardPeriodWarning.svg';
import { PERIOD_ERROR_TEXT, PERIOD_OK_TEXT } from './texts';
import { use } from 'echarts';
import { useOperationalClousureStore } from '@/zstore/ClousureOfOperations.store';

interface Props {
  error: boolean;
  period: any;
}


export default function PeriodCard({ error, title, message, period }: Props) {

  const closeManualPeriod = useOperationalClousureStore(
    (state) => state.closeManualPeriod,
  );
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
        <p>{error ? PERIOD_ERROR_TEXT : PERIOD_OK_TEXT}</p>
      </div>
      {/* error && */<button onClick={()=> {
        closeManualPeriod({
          period: period._id
        });
      }}>completar cierre</button>}
    </div>
  );
}
