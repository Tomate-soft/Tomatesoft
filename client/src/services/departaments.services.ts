import axios from '../configs/axios';
import { DEPARTAMENTS_PATH } from '../lib/path.lib';

export const getDepartamentsService = async  () =>  {
    const response = await axios(DEPARTAMENTS_PATH);
    return response;
};