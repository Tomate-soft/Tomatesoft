import axios from '@/configs/axios';
import { PAYMENTS_PATH, PAYMENTS_PATH_CURRENT } from '@/lib/path.lib';

export const getPaymentsService = async () => {
  const response = await axios.get(`${PAYMENTS_PATH}`);
  return response;
};

export const getCurrentPaymentsService = async () => {
  const response = await axios.get(`${PAYMENTS_PATH_CURRENT}`);
  return response;
};

export const updatePaymentService = async (id: string, body: any) => {
  const response = await axios.put(`${PAYMENTS_PATH}/${id}`, body);
  console.log(response);
  return response;
};
