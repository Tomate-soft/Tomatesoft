import axios from "@/configs/axios";
import { PROFILES_PATH } from "@/lib/path.lib";


export const getProfiles = async () => {
    const response = await axios.get(PROFILES_PATH);
    return response;
};

export const updateProfile = async (id: string, body: any) => {
    const response = await axios.put(`${PROFILES_PATH}/${id}`, body);
    return response.data;
};