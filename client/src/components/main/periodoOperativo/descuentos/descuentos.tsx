import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import DiscounstMainTable from '@/components/mainTables/DiscountsTable';
import NoDataIndicator from '@/components/noData/noDataIndicator';

export default function Discounts() {
  const totalBills: any = []; // provisional
  const isLoading = false;
  return isLoading ? (
    <TomateLoader />
  ) : totalBills.length > 0 ? (
    <DiscounstMainTable data={totalBills} />
  ) : (
    <NoDataIndicator>
      Los datos de los descuentos se mostraran aqui al iniciar operaciones. Para
      ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}