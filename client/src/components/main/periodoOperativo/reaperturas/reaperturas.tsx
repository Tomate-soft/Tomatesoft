import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import ReOpenMainTable from '@/components/mainTables/reOpenMainTable';
import NoDataIndicator from '@/components/noData/noDataIndicator';

export default function ReOpenings() {
  const totalBills: any = [];
  const isLoading = false;

  return isLoading ? (
    <TomateLoader />
  ) : totalBills.length > 0 ? (
    <ReOpenMainTable data={totalBills} />
  ) : (
    <NoDataIndicator>
      Los datos de las reaperturas se mostraran aqui al iniciar operaciones.
      Para ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
