import { useReopenStore } from '@/zstore/reopenStore';
import { useEffect } from 'react';

import ReOpenMainTable from '@/components/mainTables/reOpenMainTable';

export default function HistoricoDeReaperturas() {
  const reopens = useReopenStore((state) => state.reopens);
  const getReopensHistory = useReopenStore((state) => state.getReopensHistory);

  useEffect(() => {
    getReopensHistory();
  }, []);
  return <ReOpenMainTable data={reopens} />;
}
