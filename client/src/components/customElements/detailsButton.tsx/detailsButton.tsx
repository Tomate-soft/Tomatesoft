import eyeIcon from '../../../assets/public/openEye.svg';
import styles from './detailsButtons.module.css';

interface Props {
  onClick: () => void;
}

export const DetailsButton = ({ onClick }: Props) => {
  return (
    <button className={styles.detailButton} onClick={onClick}>
      <img src={eyeIcon} alt="eye-icon" />
    </button>
  );
};
