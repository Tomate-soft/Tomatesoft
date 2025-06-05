import TillCashMainTable from '@/components/mainTables/TillCash';
import NoDataIndicator from '@/components/noData/noDataIndicator';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import { useOperatingPeriodStore } from '@/zstore/operatingPeriod.store';
import { useEffect, useState } from 'react';
import { IncomingButtons } from '@/components/customElements/incomingButtons/IncomingButtons';
import IncomingForm from '@/components/customElements/incomingButtons/incoming-form/IncomingForm';

enum ShowModalOptions {
  INITAL_STATE = 'INITIAL_STATE',
  CREATE_INCOMING = 'CREATE_INCOMING',
  CREATE_EXPENSE = 'CREATE_EXPENSE',
}


export default function IncomingCash() {
  const [showModal, setShowModal] = useState<ShowModalOptions>(ShowModalOptions.INITAL_STATE);

  const isLoading = useOperatingPeriodStore((state) => state.isLoading);
  const getCurrentPeriod = useOperatingPeriodStore(
    (state) => state.getCurrentPeriod,
  );
  const response = useOperatingPeriodStore((state) => state.currentPeriod);
  const currentPeriod = response[0];

  useEffect(() => {
    getCurrentPeriod();
    console.log('currentPeriod', currentPeriod);
  }, []);
  return isLoading ? (
    <TomateLoader />  ) :
  currentPeriod?._id ? (
   <>
    <TillCashMainTable element={currentPeriod}children={<IncomingButtons onCreateExpense={()=> setShowModal(ShowModalOptions.CREATE_EXPENSE)} onCreateIncoming={()=> setShowModal(ShowModalOptions.CREATE_INCOMING)} />} />
    {showModal === ShowModalOptions.CREATE_INCOMING && <IncomingForm onSubmit={()=> {}} title="Agregar Ingreso" onClose={()=> setShowModal(ShowModalOptions.INITAL_STATE)}/> }
    {showModal === ShowModalOptions.CREATE_EXPENSE && <IncomingForm onSubmit={()=> {}} title="Agregar Egreso" onClose={()=> setShowModal(ShowModalOptions.INITAL_STATE)}/> }
   </>
  ) : (
  
    <NoDataIndicator>
      Los datos se mostraran aqui al iniciar operaciones. Para ver los datos
      historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
