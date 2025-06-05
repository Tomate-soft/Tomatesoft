//hooks
import { useEffect } from 'react';

import { useProcessOperationsStore } from '@/zstore/processOperations.store';
import AccountsMainTable from '@/components/mainTables/AccountsTable';
import NoDataIndicator from '@/components/noData/noDataIndicator';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';

export default function Cuentas() {
  const totalBills = useProcessOperationsStore((state) => state.totalBills);
  const getTotalBills = useProcessOperationsStore(
    (state) => state.getTotalBills,
  );
  const isLoading = useProcessOperationsStore((state) => state.isLoading);

  useEffect(() => {
    getTotalBills();
  }, []);

  return isLoading ? (
    <TomateLoader />
  ) : totalBills.length > 0 ? (
    <AccountsMainTable data={totalBills} />
  ) : (
    <NoDataIndicator>
      Los datos de las cuentas se mostraran aquí al iniciar operaciones. Para
      ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
