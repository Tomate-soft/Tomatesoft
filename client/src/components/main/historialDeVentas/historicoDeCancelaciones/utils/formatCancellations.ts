import formatSellType from '@/components/main/utils/formatSellType';
import { formatTempo } from '@/utils/tempoFormat';
import { CancellationTypes } from '../types/cancellations.types';

export const formatCancellation = (cancellation: any) => {
  const cancel = {
    code: cancellation?.accountId?.code,
    sellType: formatSellType(cancellation?.accountId?.sellType),
    mount: `$${parseFloat(cancellation.cancelledAmount).toFixed(2)}`,
    cancelTo: '#TODO',
    user: `${cancellation.cancellationBy.name} ${cancellation.cancellationBy.lastName}`,
    reason: cancellation.cancellationReason,
    creation: formatTempo(cancellation.createdAt),
  };

  if (cancellation.cancelType === CancellationTypes.PRODUCTS_CANCELATION) {
    return {
      ...cancel,
      note: cancellation?.noteId?.noteNumber ?? '--',
      product: cancellation?.product.productName ?? '--',
    };
  }

  if (cancellation.cancelType === CancellationTypes.NOTES_CANCELATION) {
    return {
      ...cancel,
      note: cancellation.noteId.noteNumber ?? '--',
    };
  }
  return cancel;
};
