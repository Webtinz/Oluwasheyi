import api from './caller.service';


export const getAllContents = async () => {
  const response = await api.get(`/contents`);
  return response.data;
};

