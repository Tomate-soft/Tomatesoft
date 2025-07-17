import NoDataIndicator from '@/components/noData/noDataIndicator';
import CashierSessionMainTable from '@/components/mainTables/cashierSessionsTable';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import { useOperatingPeriodStore } from '@/zstore/operatingPeriod.store';
import { useEffect } from 'react';

export default function CashierClose() {
  const currentPeriod = useOperatingPeriodStore((state) => state.currentPeriod);
  const getCurrentPeriod = useOperatingPeriodStore(
    (state) => state.getCurrentPeriod,
  );

  const sessions = currentPeriod[0].sellProcess;
  useEffect(() => {
    getCurrentPeriod();
  }, []);
  
  const isLoading = false;
  return isLoading ? (
    <TomateLoader />
  ) : sessions.length > 0 ? (
    <CashierSessionMainTable data={sessions} />
  ) : (
    <NoDataIndicator>
      Los datos de las sessiones de caja se mostraran aquí al iniciar
      operaciones. Para ver los datos historicos, vaya a la pestaña de historial
      de ventas.
    </NoDataIndicator>
  );
}
