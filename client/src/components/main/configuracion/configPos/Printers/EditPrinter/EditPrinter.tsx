import CloseButton from '@/components/customElements/CloseButton';
import styles from './EditPrinter.module.css';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import { useState } from 'react';
import { usePrintersStore } from '@/zstore/printers.store';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
interface Props {
  onClose: any;
  children: any;
  printer: any;
  closeModal: any;
}
export default function EditPrinter({
  onClose,
  children,
  printer,
  closeModal
}: Props) {
    const updatePrinter = usePrintersStore((state) => state.updatePrinter);
    const isLoading = usePrintersStore((state) => state.isLoading);
    const error = usePrintersStore((state) => state.error);
    const confirmChanges = useModal(CONFIRM_CHANGES);

    const [sendData, setSendData] = useState({
        printerName: "",
        tcp: "",
    });
  return (

    
    <main className={styles.screen}>
      <div>
      <CloseButton onClose={onClose}></CloseButton>
        <header>
            <h3>
                {children}
            </h3>
        </header>
        <main>
          <input type="text" placeholder={`${printer.printerName}`}  onChange={(e)=>{setSendData({...sendData, printerName: e.target.value})}} />
          <input type="text" placeholder={`${printer.tcp}`} value={printer.ip} onChange={(e)=>{setSendData({...sendData, tcp: e.target.value})}} />
        </main>
      <footer>
        <RequestButton  isDisable={!sendData.printerName.length && !sendData.tcp.length} action={()=>{{
            updatePrinter(printer._id, {
                printerName: sendData.printerName.length > 3 ? sendData.printerName : printer.printerName,
                tcp: sendData.tcp.length > 3 ? sendData.tcp : printer.tcp,
            });
            confirmChanges.openModal();
        }}}></RequestButton>
      </footer>
      {
        confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? ( <ConfirmChangesModal closeModal={closeModal} isOpen={confirmChanges.isOpen} onClose={confirmChanges.closeModal} loading={isLoading}  errors={error}>
           Cambios guardados </ConfirmChangesModal>) : null
      }
      </div>
    </main>
  );
}