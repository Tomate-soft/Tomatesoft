import { useEffect } from 'react';
import { useHistoryStore } from '@/zstore/historyStore';

import AccountsMainTable from '@/components/mainTables/AccountsTable';
import NoDataIndicator from '@/components/noData/noDataIndicator';

export default function HistoricoDeVentas(): JSX.Element {
  // store
  const getBillsHistory = useHistoryStore((state) => state.getBills);
  const totalBillsHistory = useHistoryStore((state) => state.bills);

  useEffect(() => {
    getBillsHistory();
  }, []);

  return totalBillsHistory.length > 0 ? (
    <AccountsMainTable data={totalBillsHistory} />
  ) : (
    <NoDataIndicator />
  );
}
