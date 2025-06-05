import { useEffect } from 'react';
import { useHistoryStore } from '@/zstore/historyStore';

import PaymentsMainTable from '@/components/mainTables/PaymentsTable';

export default function HistoricoDePagos() {
  const paymentsArray = useHistoryStore((state) => state.payments);
  const getCurrentPayments = useHistoryStore((state) => state.getPayments);

  useEffect(() => {
    getCurrentPayments();
  }, []);

  return <PaymentsMainTable data={paymentsArray} />;
}
