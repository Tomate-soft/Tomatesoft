import arrowIcon from '@/assets/public/leftArrow.svg';
import styles from './returnArrowButton.module.css';

interface Props {
  onClose: () => void;
}

export default function ReturnArrowButton({ onClose }: Props) {
  return (
    <button className={styles.returnButton} onClick={onClose}>
      <img src={arrowIcon} alt="arrow-icon" />
    </button>
  );
}
