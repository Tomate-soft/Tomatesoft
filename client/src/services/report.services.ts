import axios from '@/configs/axios';
export const getWorkedTimeReport = async () => {
  const response = await axios.get(import.meta.env.VITE_WORKED_TIME_REPORT_URL);
  return response;
};
