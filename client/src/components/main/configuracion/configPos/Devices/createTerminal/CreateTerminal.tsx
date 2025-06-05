import CloseButton from '@/components/customElements/CloseButton';
import styles from './CreateTerminal.module.css';
import { useEffect, useState } from 'react';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import arrow from '@/assets/public/arrow.svg';
import { useDevicesStore } from '@/zstore/devices.store';
import { usePrintersStore } from '@/zstore/printers.store';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';

interface Props {
  onClose: ()=> void;
  action: () => void;
  closeModal: () => void; 
}
export default function CreateTerminal({
  onClose,
  closeModal
}: Props) {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [name, setName] = useState('');
    const printers = usePrintersStore((state) => state.printers);
    const getPrinters = usePrintersStore((state) => state.getPrinters);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
   const confirmChanges = useModal(CONFIRM_CHANGES);
  


  const createTerminal = useDevicesStore((state) => state.createDevice);
  const isLoading = useDevicesStore((state) => state.isLoading);
  const error = useDevicesStore((state) => state.error);

   useEffect(() => {
          getPrinters();
      }, []);
  return (
    <main className={styles.screen}>
      <div>
        <header>
          <h1>Crear terminal</h1>
          <CloseButton onClose={onClose}></CloseButton>
        </header>
        <main>
          <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="Nombre del terminal" />
          <label htmlFor="">Impresora</label>
          <div className={styles.containerInput}>
          <div className={styles.categoriesSelect}>
            <div className={styles.customSelect} onClick={()=>{setToggleStatus(!toggleStatus)}}>
              <div className={styles.selectTrigger}>
              { selectedPrinter?.printerName ?? 'Seleccionar impresora'}
                <img src={arrow} alt="" className={styles.arrowSelect} />
              </div>
              <div className={toggleStatus ? styles.options : styles.hidden}>
              {
                 printers.map((printer, index) => (
                   <div key={index} className={styles.option} onClick={()=>{setSelectedPrinter(printer)}}>
                     {printer.printerName}
                   </div>
                 ))
               }
              </div>
            </div>
          </div>
        </div>

        </main>
        <footer>
          <RequestButton isDisable={name.length < 3 || name.length > 18 } action={()=>{createTerminal({deviceName: name}, "66bd36e5a107f6584ef54dca"), confirmChanges.openModal()}}></RequestButton>
        </footer>
         {
                    confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? ( <ConfirmChangesModal closeModal={closeModal} isOpen={confirmChanges.isOpen} onClose={confirmChanges.closeModal} loading={isLoading}  errors={error}>
                   Cambios guardados </ConfirmChangesModal>) : null
        
                }
      </div>
    </main>
  );
}