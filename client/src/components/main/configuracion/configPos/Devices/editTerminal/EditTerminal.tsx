import CloseButton from '@/components/customElements/CloseButton';
import styles from './EditTerminal.module.css';
import { useEffect, useState } from 'react';
import arrow from '@/assets/public/arrow.svg';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import { usePrintersStore } from '@/zstore/printers.store';
import { useDevicesStore } from '@/zstore/devices.store';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
interface Props {
  onClose: ()=> void;
  item: any;
  closeModal: () => void;
}

export default function EditTerminal({
  onClose,
  item,
  closeModal
}: Props) {
    const confirmChanges = useModal(CONFIRM_CHANGES);
    const [toggleStatus, setToggleStatus] = useState(false);
    const printers = usePrintersStore((state) => state.printers);
    const getPrinters = usePrintersStore((state) => state.getPrinters);
    const [selectedPrinter, setSelectedPrinter] = useState(null);
    const sendData = {
        printers: [selectedPrinter?._id]
    }
    const updateDevice = useDevicesStore((state) => state.updateDevice);
    const isLoading = useDevicesStore((state) => state.isLoading);
    const error = useDevicesStore((state) => state.error);

    useEffect(() => {
        getPrinters();
        setSelectedPrinter(printers.find((printer) => printer.printerName === item.settings.printers[0].printerName));
    }, [item]);

  return (
    <main className={styles.screen}>
      <div>
        <header>
            <h3>Editar terminal</h3>
            <CloseButton onClose={onClose}></CloseButton>
        </header>
        <main>
            <h2>{item?.deviceName}</h2>
            <div className={styles.containerInput}>
          <div className={styles.categoriesSelect}>
            <div className={styles.customSelect} onClick={()=>{setToggleStatus(!toggleStatus)}}>
              <div className={styles.selectTrigger}>
                <span>{ selectedPrinter?.printerName ?? 'Seleccionar impresora'}</span>
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
           <RequestButton action={()=>{ updateDevice(item._id, sendData), console.log(sendData),  confirmChanges.openModal() }}></RequestButton>
        </footer>
        {
            confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? ( <ConfirmChangesModal closeModal={closeModal} isOpen={confirmChanges.isOpen} onClose={confirmChanges.closeModal} loading={isLoading}  errors={error}>
           Cambios guardados </ConfirmChangesModal>) : null

        }
      </div>
    </main>
  );
}