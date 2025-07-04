import TillCashMainTable from '@/components/mainTables/TillCash';
import NoDataIndicator from '@/components/noData/noDataIndicator';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import { useOperatingPeriodStore } from '@/zstore/operatingPeriod.store';
import { useEffect, useState } from 'react';
import { IncomingButtons } from '@/components/customElements/incomingButtons/IncomingButtons';
import IncomingForm from '@/components/customElements/incomingButtons/incoming-form/IncomingForm';
import { useMoneyMovementStore } from '@/zstore/moneyMovements';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
import { set } from 'ref-napi';
import ShowDescription from './showDescription/showDescription';

enum ShowModalOptions {
  INITAL_STATE = 'INITIAL_STATE',
  CREATE_INCOMING = 'CREATE_INCOMING',
  CREATE_EXPENSE = 'CREATE_EXPENSE',
  SHOW_DESCRIPTION = 'SHOW_DESCRIPTION',
}

export default function IncomingCash() {
  const [showModal, setShowModal] = useState<ShowModalOptions>(ShowModalOptions.INITAL_STATE);
  const [selectedElement, setSelectedElement] = useState();

  const isLoading = useOperatingPeriodStore((state) => state.isLoading);
  const getCurrentPeriod = useOperatingPeriodStore(
    (state) => state.getCurrentPeriod,
  );
  const response = useOperatingPeriodStore((state) => state.currentPeriod);
  const currentPeriod = response[0] ?? [];

  const createMovement = useMoneyMovementStore((state) => state.createMovement);
  const updateMovement = useMoneyMovementStore((state) => state.updateMovement);
  const isLoadingMovement = useMoneyMovementStore((state) => state.loading);
  const error = useMoneyMovementStore((state) => state.error);

  const confirmChanges = useModal(CONFIRM_CHANGES);

  const handleClick = () => {
    updateMovement(selectedElement._id, {
      status: 'approved',
    });
    confirmChanges.openModal();
  }

  useEffect(() => { 
    getCurrentPeriod();
  }, []);
  
  return isLoading ? (
    <TomateLoader />  ) :
  currentPeriod?._id ? (
   <>
    <TillCashMainTable requests={handleClick} setSelectedElement={setSelectedElement} element={currentPeriod}children={<IncomingButtons onCreateExpense={()=> setShowModal(ShowModalOptions.CREATE_EXPENSE)} onCreateIncoming={()=> setShowModal(ShowModalOptions.CREATE_INCOMING)} />} showDescription={() => {setShowModal(ShowModalOptions.SHOW_DESCRIPTION)}} />
    {showModal === ShowModalOptions.SHOW_DESCRIPTION && <ShowDescription children={selectedElement?.description} onClose={()=> setShowModal(ShowModalOptions.INITAL_STATE)}/> }
    {showModal === ShowModalOptions.CREATE_EXPENSE && <IncomingForm onSubmit={(form)=> { 
      createMovement({...form, status: "approved", operatingPeriod: currentPeriod._id})
      confirmChanges.openModal();
    }} title="Nuevo movimiento" onClose={()=> setShowModal(ShowModalOptions.INITAL_STATE)}/> }
      { confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES &&
      (
        <ConfirmChangesModal
        isOpen={confirmChanges.isOpen}
        onClose={confirmChanges.closeModal}
        loading={isLoadingMovement}
        errors={error}
        actionType={() => {
          setShowModal(ShowModalOptions.INITAL_STATE);
          confirmChanges.closeModal();
        }
        }
      > 
          Cambios guardados
        </ConfirmChangesModal>

      )
    }
    
   </>
  ) : (
  
    <NoDataIndicator>
      Los datos se mostraran aqui al iniciar operaciones. Para ver los datos
      historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
