import api from './caller.service';


export const getAllContents = async () => {
  try{
    const response = await api.get(`/getcontentbytitle`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch contents:', error.message || error);
    return null;
  }
    
};

