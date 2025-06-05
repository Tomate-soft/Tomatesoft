import { formatTempo } from './tempoFormat';

export const formatDiscount = (element) => {
  console.log(element);
  if (!element) return;
  const selltype = element?.rappiAccountId
    ? 'Rappi'
    : element?.phoneAccountId
    ? 'Teléfonico'
    : element?.toGoAccountId
    ? 'Para llevar'
    : 'Restaurante';

  const discountFormated = {
    code: element?.accountId?.code,
    sellType: selltype,
    total: `$${parseFloat(element?.accountId?.checkTotal).toFixed(2)}`,
    mount: `$${parseFloat(element?.totalDiscountQuantity).toFixed(2)}`,
    discountBy: `${element.discountByUser.name} ${element?.discountByUser?.lastName}`,
    discountFor: `#TODO`,
    reason: element.discountReason,
    status: element.accountId?.status,
    create: formatTempo(element.createdAt),
    note: element.noteAccountId?.noteNumber ?? '--',
    product: element.productName ?? '--',
  };
  if (element?.rappiAccountId) {
    return;
  }
  if (element?.phoneAccountId) {
    return;
  }
  if (element?.toGoAccountId) {
    return;
  }

  return discountFormated;
};
