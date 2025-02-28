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


// Get sevices
export const getServices = async () => {
  try{
    const response = await api.get(`/getallservices`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch services:', error.message || error);
    return null;
  }
}

//Get programs
export const getPrograms = async () => {
  try{
    const response = await api.get(`/getallprograms`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch services:', error.message || error);
    return null;
  }
}


//Get certificates
export const getCertificates = async () => {
  try{
    const response = await api.get(`/getallcertifications`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch services:', error.message || error);
    return null;
  }
}