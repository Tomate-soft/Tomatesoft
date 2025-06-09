import { useState } from 'react';
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
  const handleSubmit = () => {
    console.log(data)
    event?.preventDefault();
    
  };
  interface FormData {
    amount: string;
    concept: string;
    description: string;
  }

  const [data, setData] = useState<FormData>({
    amount: '',
    concept: '',
    description: '',
  })

  return (
    <div className={styles.screen}>
      <div>
        <CloseButton  onClose={onClose} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <header>
            <h2>{title}</h2>
          </header>
          <main>
             <label htmlFor="concep">
              <span>
                Concepto:
              </span>
              <input placeholder='Pago de proveedor...' type="text" name="concep" required value={data.concept} onChange={(e)=> {
                const {value } = e.target;
                setData((prev) => ({ ...prev, concept: value }));
              }} />
             </label>
              
            <label htmlFor="amount">
              <span>
                Monto:
              </span>
              <input placeholder='$8,000.00' type="number" name="amount" required value={data.amount} onChange={(e)=>{
                const {value } = e.target;
                setData((prev) => ({ ...prev, amount: value })); 
              }} />
            </label>
              
            <label htmlFor="description">
              <span>
                Descripción:
              </span>
              <input placeholder='Pago de nota NT006, para productos utilizados como consumo interno.' type="text" name="description" required  value={data.description} onChange={(e)=> {
                const { value } = e.target;
                setData((prev) => ({ ...prev, description: value }));
              }}/>
            </label>
              
          </main>
          <footer>
            <button disabled={!data.amount || !data.concept || !data.description} type="submit">Enviar</button>
          </footer>
        </form>
      </div>
    </div>
  );
}