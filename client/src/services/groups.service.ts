import axios from '@/configs/axios';

export const getGruopsService = async () => {
  const response = await axios.get('/additions-group');
  return response;
};

export const createGroupService = async (body: any) => {
  const response = await axios.post('/additions-group', body);
  return response;
};

export const updateGroupService = async (id, body) => {
  const response = await axios.put(`/additions-group/${id}`, body);
  return response;
};
