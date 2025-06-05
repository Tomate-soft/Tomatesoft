// Actions
import CancellationsMainTable from '@/components/mainTables/CancellationsTable';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import NoDataIndicator from '@/components/noData/noDataIndicator';

export default function Cancelaciones() {
  const allCancellations: any = [];
  const isLoading = false;

  return isLoading ? (
    <TomateLoader />
  ) : allCancellations.length > 0 ? (
    <CancellationsMainTable data={allCancellations} />
  ) : (
    <NoDataIndicator>
      Los datos de las cancelaciones se mostraran aqui al iniciar operaciones.
      Para ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
