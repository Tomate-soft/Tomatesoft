import axios from '@/configs/axios';
import { REOPEN_BILL_PATH } from '@/lib/path.lib';

export const getReopens = async () => {
  const response = await axios(REOPEN_BILL_PATH);
  return response;
};

export const getReopensCurrent = async () => {
  const response = await axios(`${REOPEN_BILL_PATH}/current`);
  return response;
};