import axios from "@/configs/axios";


export const getDevices = async () => {
  const response = await axios("/device");
  return response;
};

export const updateDevice = async (id: string, data: any) => {
 
  const response = await axios.put(`device/${id}`, data);
  return response;
};

export const createDevice = async (data: any, id: string) => {
  const response = await axios.post(`device/${id}`, data);
  return response;
};