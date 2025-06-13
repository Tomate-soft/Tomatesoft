import CloseButton from '../../CloseButton';
import styles from './IncomingForm.module.css';


export interface IncomingFormProps {
  onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
}

export default function IncomingForm({
  onClose,
  onSubmit,
  title,
}: IncomingFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <div className={styles.screen}>
      {/* <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <label htmlFor="amount">Monto:</label>
        <input type="number" name="amount" required />
        <label htmlFor="description">Descripción:</label>
        <input type="text" name="description" required />
        <button type="submit">Enviar</button>
        <button type="button" onClick={onClose}>Cerrar</button>
      </form> */}
      <div>
        <CloseButton  onClose={onClose} />

        <h2>{title}</h2>
      </div>
    </div>
  );
}