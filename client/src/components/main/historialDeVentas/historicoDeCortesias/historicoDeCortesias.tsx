import { useHistoryStore } from '@/zstore/historyStore';
import { CourtesyTypes } from './types/Courtesies.types';
import { useEffect, useState } from 'react';

import NoDataIndicator from '@/components/noData/noDataIndicator';
import CourtesiesMainTable from '@/components/mainTables/CourtesiesTable';

export default function HistoricoDeCortesias() {
  const courtesies = useHistoryStore((state) => state.discounts);
  const getCurrentCourtesies = useHistoryStore((state) => state.getDiscounts);

  useEffect(() => {
    getCurrentCourtesies();
  }, []);

  return courtesies.length > 0 ? (
    <CourtesiesMainTable data={courtesies} />
  ) : (
    <NoDataIndicator>
      Los datos de las cuentas se mostraran aquí al iniciar operaciones. Para
      ver los datos historicos, vaya a la pestaña de historial de ventas.
    </NoDataIndicator>
  );
}
