import axios from "@/configs/axios"
import { OPERATING_PERIODS_PATH } from "@/lib/path.lib";



export const createMoneyMovement = async (body) => {
    const response = await axios.post(`${OPERATING_PERIODS_PATH}/money-movement`, body);
    return response.data;
}