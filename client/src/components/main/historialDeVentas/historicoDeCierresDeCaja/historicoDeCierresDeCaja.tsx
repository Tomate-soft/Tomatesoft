import CashierSessionMainTable from '@/components/mainTables/cashierSessionsTable';
import NoDataIndicator from '@/components/noData/noDataIndicator';
import { useHistoryStore } from '@/zstore/historyStore';
import { useEffect } from 'react';

export default function HistoricoDeCierresDeCaja() {
  const sessions = useHistoryStore((state) => state.cashierSessions);
  const getCurrentSessions = useHistoryStore(
    (state) => state.getCashierSessions,
  );

  useEffect(() => {
    getCurrentSessions();
  }, []);

  return sessions.length > 0 ? (
    <CashierSessionMainTable data={sessions} />
  ) : (
    <NoDataIndicator>
      Los datos de las cuentas se mostraran aquí al iniciar operaciones. Para
      ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
