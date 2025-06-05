import styles from './saveButton.module.css';
import disquetIcon from '@/assets/public/disquetIcon.svg';

enum Modes {
  SAVE = 'SAVE_MODE', // default
  SEND = 'SEND_MODE',
}

interface Props {
  mode?: Modes;
  action: () => void;
  text?: string;
  isDisable?: boolean;
}

export default function RequestButton({
  mode,
  action,
  text,
  isDisable,
}: Props) {
  return (
    <button
      disabled={isDisable}
      className={styles.requestButton}
      onClick={action}
    >
      {/* TODO: AGREGAR UN SEND MODO */}
      {mode === Modes.SEND ? (
        ' '
      ) : (
        <>
          <span>{text ?? 'Guardar'}</span>
          <img src={disquetIcon} alt="save-icon" />
        </>
      )}
    </button>
  );
}
