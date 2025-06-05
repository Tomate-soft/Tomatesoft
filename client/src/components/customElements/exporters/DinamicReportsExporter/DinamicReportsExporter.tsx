import CloseButton from '../../CloseButton';
import styles from './DinamicReportsExporter.module.css';
import DatePicker from './pickers/datePicker/DatePicker';

interface IConfig{
  datePicker: boolean;
  timePicker: boolean;
  sellTypePicker: boolean;
  formatPicker: boolean;
}

interface Props {
  children: string;
  onclose: () => void;
  request: () => Promise<void>;
  config: IConfig
}

export default function DinamicReportsExporter({ children , onclose, request, config }: Props) {
  return (
    <div className={styles.screen}>
        <div>
        <header>
            <h1>{children}</h1>
            <CloseButton onClose={onclose} />
        </header>
        <main>
          {
            config.datePicker && <DatePicker />
          }
        </main>
        <footer>
            <button onClick={request}>Exportar</button>
        </footer>
        </div>
    </div>
  );
}