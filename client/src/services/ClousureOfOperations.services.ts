import axios from "@/configs/axios";
export const clousureManualPeriodService = async (body: any) => {
    const response = await axios.post(
        `cron/close-manual-period`, body);
        return response;
}