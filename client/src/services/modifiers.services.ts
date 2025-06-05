import axios from '@/configs/axios';

export const getModifiersService = async () => {
  const response = await axios('/modifications');
  return response;
};

export const updateMopdifiersService = async (id: string, body: any) => {
  console.log(id)
  console.log(body)
  const response = await axios.put(`/modifications/${id}`, body);
  return response;
};