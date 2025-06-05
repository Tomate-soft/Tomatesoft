import NoDataIndicator from '@/components/noData/noDataIndicator';
import CashierSessionMainTable from '@/components/mainTables/cashierSessionsTable';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';

export default function CashierClose() {
  const totalBills: any = []; // provisional
  const isLoading = false;
  return isLoading ? (
    <TomateLoader />
  ) : totalBills.length > 0 ? (
    <CashierSessionMainTable data={totalBills} />
  ) : (
    <NoDataIndicator>
      Los datos de las sessiones de caja se mostraran aquí al iniciar
      operaciones. Para ver los datos historicos, vaya a la pestaña de historial
      de ventas.
    </NoDataIndicator>
  );
}
