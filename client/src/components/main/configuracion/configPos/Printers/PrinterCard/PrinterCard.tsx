import styles from './PrinterCard.module.css';
import editIcon from '@/assets/public/editPencil.svg';
import trashIcon from '@/assets/public/trashIcon.svg';
import createIcon from '@/assets/public/createIcon.svg';

interface Props {
    printer: any;
    index: number;
    action: () => void;
    preferencesAction: () => void;
}
export default function PrinterCard({
    printer,
    index,
    action,
    preferencesAction
}: Props) {

    return (
        <div className={styles.container}>
            <section>
            <div>
            <p>{index.toString().padStart(3, '0')}</p>
            <h4>{printer.printerName}</h4>
            </div>
            <div>
                <button onClick={()=>{ action()}}><img src={editIcon} alt="edit-icon" /></button>
                <button><img src={trashIcon} alt="trash-icon" /></button>
            </div>
            </section>
            <button onClick={preferencesAction}><img src={createIcon} alt="" />Preferencias de impresora</button>
        </div>
    );
}
