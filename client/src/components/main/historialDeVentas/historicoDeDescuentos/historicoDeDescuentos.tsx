import { useEffect } from 'react';
import { useHistoryStore } from '@/zstore/historyStore';
import DiscounstMainTable from '@/components/mainTables/DiscountsTable';

export default function HistoricoDeDescuentos() {
  const discountsArray = useHistoryStore((state) => state.discounts);
  const getCurrentDiscounts = useHistoryStore((state) => state.getDiscounts);

  useEffect(() => {
    getCurrentDiscounts();
  }, []);

  return <DiscounstMainTable data={discountsArray} />;
}
