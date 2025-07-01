import { useState } from 'react';
import CloseButton from '../../CloseButton';
import styles from './IncomingForm.module.css';

export interface IncomingFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
}
enum MovementType {
  INCOMING = 'income',
  EXPENSE = 'expense',
}

export default function IncomingForm({
  onClose,
  onSubmit,
  title,
}: IncomingFormProps) {
  const [formState, setFormState] = useState({
    type: MovementType.INCOMING, 
    amount: '',
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className={styles.screen}>
      <div>
        <header>
          <CloseButton onClose={onClose} />
          <h2>{title}</h2>
        </header>
        <main>
          <form className={styles.form} id="movementForm" onSubmit={handleSubmit}>
             <label htmlFor="type">Tipo de movimiento:

              <select
              name="type"
              required
              value={formState.type}
              onChange={handleChange}
            >
              <option value={MovementType.INCOMING}>Ingreso</option>
              <option value={MovementType.EXPENSE}>Egreso</option>
            </select> 
             </label>
                
            <label htmlFor="amount">Monto:
               <input
              type="number"
              name="amount"
              required
              value={formState.amount}
              onChange={handleChange}
            />
           
            </label>
             <label htmlFor="title">Concepto:
               <input
                type="text"
                name="title"
                required
                value={formState.title}
                onChange={handleChange}
            />
            </label>
             <label htmlFor="description">Descripción:
               <input
              type="text"
              name="description"
              required
              value={formState.description}
              onChange={handleChange}
            />
            </label>
            
          </form>
        </main>
        <footer>
          <button form="movementForm" type="submit">Guardar</button>
        </footer>
      </div>
    </div>
  );
}
