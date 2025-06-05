import CloseButton from '@/components/customElements/CloseButton';
import questionIcon from '@/assets/public/questionIcon.svg';
import styles from './interactiveModal.module.css';
import RequestButton from '@/components/customElements/saveButton/savebutton';
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  action: () => void;
}
export default function InteractiveModal({
  isOpen,
  onClose,
  children,
  action,
}: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <img src={questionIcon} alt="question-icon" />
        <CloseButton onClose={onClose} />
        <h2>{children}</h2>
        <footer>
          <RequestButton action={action} />
        </footer>
      </div>
    </main>
  );
}
