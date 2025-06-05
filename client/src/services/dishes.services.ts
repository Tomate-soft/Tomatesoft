import axios from '@/configs/axios';

export const getDishesService = async () => {
  const response = await axios('/dishes');
  return response;
};

export const updateDishesService = async (id: string, body: any) => {
  const response = await axios.put(`/dishes/${id}`, body);
  return response;
};