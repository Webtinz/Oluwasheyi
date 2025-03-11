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

// Get departments
export const getDepartments = async () => {
  try{
    const response = await api.get(`/getalldepartments`);    
    return response.data;
  }catch (error){
    console.error('Failed to fetch departments:', error.message || error);
    return null;
  }
}

//Get health programs
export const getPrograms = async () => {
  try{
    const response = await api.get(`/getallprograms`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch health programs:', error.message || error);
    return null;
  }
}


//Get certificates
export const getCertificates = async () => {
  try{
    const response = await api.get(`/getallcertifications`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch certificates:', error.message || error);
    return null;
  }
}

//Get Events
export const getEvents = async () => {
  try{
    const response = await api.get(`/getallevents`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch Events:', error.message || error);
    return null;
  }
}

//Get Advices
export const getAdvices = async () => {
  try{
    const response = await api.get(`/getalladvices`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch Advices:', error.message || error);
    return null;
  }
}


//Get Team Members
export const getTeamMembers = async () => {
  try{
    const response = await api.get(`/getallteamMembers`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch Team Members:', error.message || error);
    return null;
  }
}

//Get Team Members
export const getTestimonials = async () => {
  try{
    const response = await api.get(`/getalltestimonials`);
    return response.data;
  }catch (error){
    console.error('Failed to fetch Team Members:', error.message || error);
    return null;
  }
}

// Ajouter un feedback
export const addFeedback = async (data) => {
  try {
    const response = await api.post('/addfeedback', data);
    return response.data;
  } catch (error) {
    console.error('Error adding addfeedback:', error);
    throw error.response?.data || error;
  }
};

// Ajouter une donation
export const addDonation = async (data) => {
  try {
    const response = await api.post('/adddonnation', data);
    return response.data;
  } catch (error) {
    console.error('Error adding donation:', error);
    throw error.response?.data || error;
  }
};


// Add patient
export const addNewpatient = async (data) => {
  try {
    const response = await api.post('/registerpatient', data);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error.response?.data || error;
  }
};