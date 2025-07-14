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

