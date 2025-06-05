import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import CourtesiesMainTable from '@/components/mainTables/CourtesiesTable';
import NoDataIndicator from '@/components/noData/noDataIndicator';

export default function Courtesies() {
  const totalBills: any = []; // provisional
  const isLoading = false;

  return isLoading ? (
    <TomateLoader />
  ) : totalBills.length > 0 ? (
    <CourtesiesMainTable data={totalBills} />
  ) : (
    <NoDataIndicator>
      Los datos de las cortesias se mostraran aquí al iniciar operaciones. Para
      ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
