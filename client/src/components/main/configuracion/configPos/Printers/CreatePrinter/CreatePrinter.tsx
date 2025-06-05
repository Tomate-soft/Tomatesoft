import CloseButton from '@/components/customElements/CloseButton';
import styles from './CreatePrinter.module.css';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import { useState } from 'react';
import { usePrintersStore } from '@/zstore/printers.store';
import { create } from 'zustand';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
interface Props {
  onClose: any;
  children: any;
  closeModal: () => void;
}
export default function CreatePrinter({
  onClose,
  children,
  closeModal
}: Props) {

  const createPrinter = usePrintersStore((state) => state.createPrinter);
  const isLoading = usePrintersStore((state) => state.isLoading);
  const error = usePrintersStore((state) => state.error);
  const confirmChanges =  useModal(CONFIRM_CHANGES)
 


    const [newPrinter, setNewPrinter] = useState({
        printerName: '',
        tcp: ''
    });
  return (
    <main className={styles.screen}>
      <div>
        <CloseButton onClose={onClose}></CloseButton>
        <header>
            <h3>Crear impresora</h3>
        </header>
        <main>
            <input type="text"placeholder='Nombre de la impresora' onChange={(e)=>setNewPrinter({...newPrinter, printerName: e.target.value})}/>
            <input type="text" placeholder='IP de la impresora' onChange={(e)=>setNewPrinter({...newPrinter, tcp: e.target.value})}/>
           
        </main>
        <footer>
            <RequestButton isDisable={ newPrinter.printerName.length < 3 || newPrinter.tcp.length < 11} action={()=> {
               createPrinter(newPrinter);
               confirmChanges.openModal();
            }}></RequestButton>
        </footer>
        {
        confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <>
        <ConfirmChangesModal isOpen={confirmChanges.isOpen} errors={error} onClose={confirmChanges.closeModal} closeModal={closeModal} loading={isLoading} >Cambios guardados</ConfirmChangesModal>
        
        </>) : null
      }
      </div>
      
    </main>
  );
}