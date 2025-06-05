import { useEffect } from 'react';
import styles from './operatingClousure.module.css';
import { Processing, State } from './types';
import ReturnButton from '@/components/customElements/returnButton.tsx/returnButton';
import PeriodCard from '../cards/periodCard';
import TillCard from '../cards/tillCard';
import BillCard from '../cards/billCard';
import { useOperatingPeriodStore } from '@/zstore/operatingPeriod.store';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
import { CONFIRM_CHANGES } from '@/configs/consts';
import { useModal } from '@/hooks/useModals';

interface Props {
  onClose: any;
  processing?: string;
  period: any;
}
export default function OperatingClousureModal({
  onClose,
  processing,
  period,
}: Props) {
  const formarDate = new Date(period.createdAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const confirmChanges = useModal(CONFIRM_CHANGES);
  const approvePeriod = useOperatingPeriodStore((state) => state.approvePeriod);
  const approvePeriodLoading = useOperatingPeriodStore(
    (state) => state.isLoading,
  );
  const approvePeriodErrors = useOperatingPeriodStore((state) => state.errors);
  const approvePeriodMessage = useOperatingPeriodStore(
    (state) => state.message,
  );

  const periodState = period.operationalClousure?.state;
  const isClosed = period.operationalClousure?.state === State.CLOSED;

  return (
    <main
      className={
        processing === Processing.CONFIRM_PROCESSING
          ? styles.screen
          : styles.hidden
      }
    >
      <header>
        <div>
          <ReturnButton
            onClose={() => {
              onClose(Processing.INITIAL);
            }}
          />
          <span>Detalles del periodo de {formarDate}</span>
        </div>
        <button
          disabled={!isClosed || periodState != State.CLOSED}
          onClick={() => {
            confirmChanges.openModal();
            approvePeriod(period._id, { userId: '663aa1930956c5977c55789c' });
          }}
        >
          Aprobar cierre operativo
        </button>
      </header>
      <section>
        <PeriodCard
          error={
            period.operationalClousure?.state === State.CLOSED ||
            period.operationalClousure?.state === State.APPROVED
              ? false
              : true
          }
          period={period}
        />
        <TillCard error={false} period={period} />
        <BillCard error={false} period={period} />
      </section>
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <ConfirmChangesModal
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
          loading={approvePeriodLoading}
          errors={approvePeriodErrors}
          conflict={approvePeriodMessage}
        >
          Aprobar cierre operativo
        </ConfirmChangesModal>
      ) : null}
    </main>
  );
}
