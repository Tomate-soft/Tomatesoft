import { useReopenStore } from '@/zstore/reopenStore';
import { useEffect } from 'react';

import ReOpenMainTable from '@/components/mainTables/reOpenMainTable';

export default function HistoricoDeReaperturas() {
  const reopens = useReopenStore((state) => state.reopens);
  const getReopens = useReopenStore((state) => state.getReopens);

  useEffect(() => {
    getReopens();
  }, []);
  return <ReOpenMainTable data={reopens} />;
}
