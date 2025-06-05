import {
  CASH_TEXT,
  CREDIT_CARD_TEXT,
  DEBIT_CARD_TEXT,
  PaymentsTypesOptions,
  QR_CODE_PAYMENT_TEXT,
  TRANSFER_TEXT,
} from '@/types/paymentsTypes';

export const formatPayMethods = (payment: string) =>
  payment === PaymentsTypesOptions.CASH_PAYMENT
    ? CASH_TEXT
    : payment === PaymentsTypesOptions.CREDIT_CARD_PAYMENT
    ? CREDIT_CARD_TEXT
    : payment === PaymentsTypesOptions.DEBIT_CARD_PAYMENT
    ? DEBIT_CARD_TEXT
    : payment === PaymentsTypesOptions.TRANSFER_PAYMENT
    ? TRANSFER_TEXT
    : payment === PaymentsTypesOptions.QR_CODE_PAYMENT
    ? QR_CODE_PAYMENT_TEXT
    : '';
