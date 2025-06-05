import axios from '@/configs/axios';
import {
  CANCELLATIONS_PATH,
  CASHIER_SESSION_PATH,
  DISCOUNTS_PATH,
  HISTORY_BILLS_PATH,
  PAYMENTS_PATH,
} from '@/lib/path.lib';

export const getBillsService = async () => {
  const response = await axios(`${HISTORY_BILLS_PATH}`);
  return response;
};

export const getPaymentsService = async () => {
  const response = await axios(`${PAYMENTS_PATH}`);
  return response;
};

export const getDiscountsService = async () => {
  const response = await axios(`${DISCOUNTS_PATH}`);
  return response;
};

export const getCancellationsService = async () => {
  const response = await axios(`${CANCELLATIONS_PATH}`);
  return response;
};

export const getCashierSessionsService = async () => {
  const response = await axios(`${CASHIER_SESSION_PATH}`);
  return response;
};
