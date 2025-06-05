import styles from './ComponentStyle.module.css';
import disquetIcon from '@/assets/public/disquetIcon.svg';

interface Props {
  action: () => void;
  disabled?: boolean;
}

export default function SaveButton({ action , disabled }: Props) {
  return (
    <button className={styles.saveButton} onClick={action} disabled={disabled} style={disabled ? {opacity: 0.5} : {}}>
      <img src={disquetIcon} alt="close-icon" />
      <span>Guardar</span>
    </button>
  );
}
