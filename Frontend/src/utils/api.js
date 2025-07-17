import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}api/v1/`;

// LOGIN
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}admin/login`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// REGISTER
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}admin/register`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// ADD PATIENT
export const addPatient = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}patient/addpatient`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// GET PATIENT BY CUSTOM ID
export const getPatientByCustomId = async (customID) => {
  try {
    const response = await axios.get(
      `${BASE_URL}patient/getpatientbycustomid/${customID}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
}

// GET ALL PATIENT
export const getAllPatient = async () => {
  try {
    const response = await axios.get(`${BASE_URL}patient/getallpatient`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
}

// SPEAK TEXT
export const speakText = async (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

// GET DOCTER BY SYMPTOM
export const getDoctorBySymptom = async (symptom) => {
  const res = await axios.get(`${BASE_URL}/ai/assign?symptom=${symptom}`);
  return res.data.doctor;
};

