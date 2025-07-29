import CloseButton from '@/components/customElements/CloseButton';
import styles from './PrintersConfig.module.css';
import { useEffect, useState } from 'react';
import { usePrintersStore } from '@/zstore/printers.store';
import PrinterCard from './PrinterCard/PrinterCard';
import EditPrinter from './EditPrinter/EditPrinter';
import CreatePrinter from './CreatePrinter/CreatePrinter';
import PrinterPreferentes from './preferences/PrinterPreferentes';

interface Props {
    isOpen: boolean;
  onClose: any;
  children: any;
}
enum PrinterProcessOtions{
  INITIAL= "INITIAL",
  CREATE= "CREATE",
  EDIT= "EDIT",
  PREFERENCES= "PREFERENCES",
}
export default function PrintersConfig({
isOpen,
  onClose,
  children,
}: Props) {
    const printers = usePrintersStore((state) => state.printers);
        const getPrinters = usePrintersStore((state) => state.getPrinters);
        const [printerProcess, setPrinterProcess] = useState<PrinterProcessOtions>(PrinterProcessOtions.INITIAL);
        const [selectedPrinter, setSelectedPrinter] = useState(null);

        useEffect(() => {
            getPrinters();
        }, []);
  return (
    <main className={styles.screen}>
      <div>
        <CloseButton onClose={onClose}></CloseButton>
        <header>
            <h3>{children}</h3>
            <button onClick={()=>setPrinterProcess(PrinterProcessOtions.CREATE)}>Crear impresora</button>
        </header>
        <main>
            {
                printers.map((printer, index) => (
                    <PrinterCard preferencesAction={()=>{
                        setPrinterProcess(PrinterProcessOtions.PREFERENCES)
                        setSelectedPrinter(printer)
                    }}
                     action={()=>{
                        setSelectedPrinter(printer)
                        setPrinterProcess(PrinterProcessOtions.EDIT)
                    }} index={index+1} printer={printer} key={index}></PrinterCard>
                    
                ))
            }
        </main>
        <footer>
        </footer>
      </div>
      {
        printerProcess === PrinterProcessOtions.EDIT && <EditPrinter  closeModal={onClose} onClose={()=>setPrinterProcess(PrinterProcessOtions.INITIAL)} printer={selectedPrinter}>Editar impresora</EditPrinter>
      }
      {
        printerProcess === PrinterProcessOtions.CREATE && <CreatePrinter  closeModal={onClose} onClose={()=>setPrinterProcess(PrinterProcessOtions.INITIAL)}>CreatePrintera</CreatePrinter>
      }
      {
        printerProcess === PrinterProcessOtions.PREFERENCES && <PrinterPreferentes   onClose={()=>setPrinterProcess(PrinterProcessOtions.INITIAL)} printer={selectedPrinter}>Preferencias de impresion</PrinterPreferentes>
      }
    </main>
  );
}