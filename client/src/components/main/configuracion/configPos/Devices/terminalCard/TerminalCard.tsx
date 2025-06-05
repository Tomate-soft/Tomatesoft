import styles from './terminalCard.module.css';
import configIcon from '@/assets/public/configIcon.svg';
import editIcon from '@/assets/public/editPencil.svg';
import syncIcon from '@/assets/public/syncButton.svg';

interface Props {
  item: any;
  id: number;
  action: () => void;
  onClick: () => void;
}

export default function TerminalCard({ item, id, action, onClick }: Props) {
  return (
    <div className={styles.card}>
      <header>
        <span>{`${id}`.padStart(3, '0')}</span>
        <span>{item?.deviceName}</span>
      </header>
      <main>
        <h3>Impresora asignada: {`${item?.settings?.printers[0]?.printerName}`}</h3>
      </main>
      <footer>
        <button>
          <img src={configIcon} alt="config-icon" />
          Configurar permisos
        </button>
        <button onClick={onClick}>
          <img src={editIcon} alt="edit-icon" />
        </button>
        <button>
          <img src={syncIcon} alt="delete-icon" />
        </button>
      </footer>
    </div>
  );
}
