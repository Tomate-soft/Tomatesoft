import {
  CASH_TEXT,
  COMPUTED_TEXT,
  CREDIT_CARD_TEXT,
  DEBIT_CARD_TEXT,
  PaymentsTypesOptions,
  QR_CODE_PAYMENT_TEXT,
  TRANSFER_TEXT,
} from '@/types/paymentsTypes';

interface Transaction {
  paymentType: PaymentsTypesOptions;
  quantity: string;
  payQuantity: string;
  tips: string;
}

export const settingPayMethods = (transactionsArray: Transaction[]) => {
  const paymentTypeMap: { [key in PaymentsTypesOptions]: string } = {
    [PaymentsTypesOptions.CASH_PAYMENT]: CASH_TEXT,
    [PaymentsTypesOptions.CREDIT_CARD_PAYMENT]: CREDIT_CARD_TEXT,
    [PaymentsTypesOptions.DEBIT_CARD_PAYMENT]: DEBIT_CARD_TEXT,
    [PaymentsTypesOptions.TRANSFER_PAYMENT]: TRANSFER_TEXT,
    [PaymentsTypesOptions.QR_CODE_PAYMENT]: QR_CODE_PAYMENT_TEXT,
  };

  const paymentTypesUsed = transactionsArray.reduce((acc, transaction) => {
    acc.add(transaction.paymentType);
    return acc;
  }, new Set());

  if (paymentTypesUsed.size === 1) {
    const uniquePaymentType = transactionsArray[0].paymentType;
    return {
      type: paymentTypeMap[uniquePaymentType],
      transactions: transactionsArray,
    };
  }

  return { type: COMPUTED_TEXT, transactions: transactionsArray };
};
