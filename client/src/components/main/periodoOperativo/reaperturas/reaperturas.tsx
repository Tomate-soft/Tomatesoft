import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';
import ReOpenMainTable from '@/components/mainTables/reOpenMainTable';
import NoDataIndicator from '@/components/noData/noDataIndicator';
import { useReopenStore } from '@/zstore/reopenStore';
import { useEffect } from 'react';

export default function ReOpenings() {
  

  const reopensCurrent = useReopenStore((state) => state.currentReopen);
  const getReopensCurrent = useReopenStore((state) => state.getReopensCurrent);
  const isLoading = useReopenStore((state) => state.loading);
  
    useEffect(() => {
      getReopensCurrent();
    }, []);

  return isLoading ? (
    <TomateLoader />
  ) : reopensCurrent.length > 0 ? (
    <ReOpenMainTable data={reopensCurrent} />
  ) : (
    <NoDataIndicator>
      Los datos de las reaperturas se mostraran aqui al iniciar operaciones.
      Para ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
