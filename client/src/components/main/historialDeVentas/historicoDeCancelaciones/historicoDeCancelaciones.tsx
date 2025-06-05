import { useHistoryStore } from '@/zstore/historyStore';
import { useEffect } from 'react';

import CancellationsMainTable from '@/components/mainTables/CancellationsTable';

export default function HistoricoDeCancelaciones() {
  const cancellationsArray = useHistoryStore((state) => state.cancellations);
  const getCurrentCancellations = useHistoryStore(
    (state) => state.getCancellations,
  );

  useEffect(() => {
    getCurrentCancellations();
    console;
  }, []);

  return <CancellationsMainTable data={cancellationsArray} />;
}
