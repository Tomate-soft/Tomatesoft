import styles from './IncomingButtons.module.css';
import createIcon from '@/assets/public/createIcon.svg';
interface IncomingButtonsProps {
  onCreateIncoming?: () => void;
    onCreateExpense?: () => void;
}


export const IncomingButtons = ({ onCreateIncoming, onCreateExpense }: IncomingButtonsProps) => {
    return (
        <section className={styles.container}>
            <button onClick={onCreateIncoming}>
                <img src={createIcon} alt="create-icon" />
                Ingreso
            </button>
            <button onClick={onCreateExpense}>
                <img src={createIcon} alt="create-icon" />
                Egreso
            </button>
        </section>
    )
}