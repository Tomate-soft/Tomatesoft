import axios from '@/configs/axios';
import { PRODUCTS_PATH } from '@/lib/path.lib';

export const updateProducts = async (id: string, body: any) => {
  const response = await axios.put(`${PRODUCTS_PATH}/${id}`, body);
  return response;
};

export const getProducts = async () => {
  const response = await axios(`${PRODUCTS_PATH}`);
  return response;
};
