import styles from './noData.module.css';
import noDataIndicator from '../../assets/public/noDataIcon.svg';

interface Props {
  children: string;
}
export default function NoDataIndicator({ children }: Props) {
  return (
    <div className={styles.container}>
      <img src={noDataIndicator} alt="no data indicator" />
      <div>
        <p className="text-center text-xl font-bold">
          No hay datos disponibles
        </p>
        <p className="text-center text-xl font-bold">{children}</p>
      </div>
    </div>
  );
}
