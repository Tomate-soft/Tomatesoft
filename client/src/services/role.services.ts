import axios from '../configs/axios';
import { ROLE_PATH } from '../lib/path.lib';

export const getRoles = async  () =>  {
    const response = await axios(ROLE_PATH);
    console.log(response);
    return response;
};