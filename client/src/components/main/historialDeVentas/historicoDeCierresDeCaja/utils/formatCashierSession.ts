import { formatTempo } from '@/utils/tempoFormat';

export const formatCashierSession = (session: any) => {
  const cashier = {
    code: session._id.slice(0, 6),
    terminal: '#pendiente',
    cashier: `${session?.user?.name} ${session?.user?.lastName}`,
    cash: session.totalCash,
    difference: '#DIFERRENCE-PENDING',
    openDate: formatTempo(session.createdAt),
    closeDate: formatTempo(session.updatedAt),
  };
  return cashier;
};
