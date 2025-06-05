import axios from "@/configs/axios";


export const getPrinters = async () => {
  const response = await axios("setting/printers");
  return response;
};

export const updatePrinter = async (id: string, body: any) => {
  const response = await axios.put(`printers/${id}`, body);
  return response;
};

export const createPrinter = async (body: any) => {
  const response = await axios.post("printers", body);
  return response;
};