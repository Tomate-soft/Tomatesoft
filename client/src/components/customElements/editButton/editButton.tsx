import styles from './editButton.module.css';
import editIcon from '@/assets/public/editPencil.svg';

interface EditButtonProps {
  action: () => void;
}
export default function EditButton({ action }: EditButtonProps) {
  return (
    <button onClick={action} className={styles.editButton}>
      <img src={editIcon} alt="edit-icon" />
    </button>
  );
}
