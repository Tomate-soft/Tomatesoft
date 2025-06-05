// Hooks
//icons
import { useEffect } from 'react';
import { usePaymentsStore } from '@/zstore/payments.store';
import PaymentsMainTable from '@/components/mainTables/PaymentsTable';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import NoDataIndicator from '@/components/noData/noDataIndicator';

export default function Pagos() {
  const currentPayment = usePaymentsStore((state) => state.payments);
  const getCurrentPayments = usePaymentsStore(
    (state) => state.getCurrentPayments,
  );
  const isLoading = usePaymentsStore((state) => state.isLoading);
  useEffect(() => {
    getCurrentPayments();
  }, []);

  return isLoading ? (
    <TomateLoader />
  ) : currentPayment.length > 0 ? (
    <PaymentsMainTable data={currentPayment} />
  ) : (
    <NoDataIndicator>
      Los datos de los pagos se mostraran aqui al iniciar operaciones. Para ver
      los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
