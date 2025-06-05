import axios from '@/configs/axios';
import { OPERATING_PERIODS_PATH } from '@/lib/path.lib';

export const getOperatingPeriodsService = async () => {
  const response = await axios(`${OPERATING_PERIODS_PATH}`);
  return response;
};

export const approvePeriodService = async (
  periodId: string,
  body: { userId: string },
) => {
  const response = await axios.patch(
    `${OPERATING_PERIODS_PATH}/close-period/${periodId}`,
    body,
  );
  return response;
};


export const getCurrentPeriodService = async () => {
  const response = await axios(`${OPERATING_PERIODS_PATH}/current`);
  console.log(response);
  return response;
};
