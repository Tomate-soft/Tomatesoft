import formatSellType from '@/components/main/utils/formatSellType';
import { formatTempo } from '@/utils/tempoFormat';

export const formatCourtesy = (courtesy: any) => {
  const isNote = courtesy?.noteAccountId && courtesy?.productName;
  const isProduct = courtesy?.productName;
  const court = {
    code: courtesy?.accountId?.code ?? '--',
    sellType: formatSellType(courtesy?.accountId?.sellType) ?? '--',
    mount: `$${parseFloat(courtesy.totalDiscountQuantity).toFixed(2)}`,
    user: courtesy?.discountByUser?.name
      ? `${courtesy?.discountByUser?.name} ${courtesy?.discountByUser?.lastName}`
      : '--',
    courtFor: `${courtesy.accountId?.user}`,
    reason: courtesy.discountReason,
    date: formatTempo(courtesy.createdAt),
  };

  if (isProduct) {
    return {
      ...court,
      product: courtesy?.productName,
      note: '--',
      sellType: formatSellType('onSite') ?? '--',
    };
  }

  if (isNote) {
    return {
      ...court,
      note: courtesy?.noteAccountId?.noteNumber,
      sellType: formatSellType('onSite') ?? '--',
    };
  }

  return court;
};
