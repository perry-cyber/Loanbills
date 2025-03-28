import api from './Api';

const setUserAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const setAdminAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};


export const registerUser = async (userData) => {
  try {
    const response = await api.post('/user/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/user/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const resendOtp = async (email) => {
  try {
    const response = await api.post('/user/resend-otp', { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await api.post('/user/login', userData);
    const { token, expires_in } = response.data;
    window.sessionStorage.setItem('userToken', token);
    window.sessionStorage.setItem('userTokenExpiration', Date.now() + expires_in * 1000);

    // Auto-logout and redirect when token expires
    setTimeout(() => {
      logoutUser();
      window.location.href = '/login';
    }, expires_in * 1000);

    setUserAuthToken(token);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const logoutUser = () => {
  window.sessionStorage.removeItem('userToken');
  window.sessionStorage.removeItem('userTokenExpiration');
  setUserAuthToken(null);
};


export const checkTokenExpiration = () => {
  const tokenExpiration = window.sessionStorage.getItem('userTokenExpiration');
  if (tokenExpiration && Date.now() > tokenExpiration) {
    logoutUser();
    window.location.href = '/login';
  }
};


export const requestPasswordReset = async (data) => {
  try {
    const response = await api.post('/forgot-password', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const resetPassword = async (data) => {
  try {
    const response = await api.post('/reset-password', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const loginAdmin = async (adminData) => {
  try {
    const response = await api.post('/admin/login', adminData);
    const { token, expires_in } = response.data;

    window.sessionStorage.setItem('adminToken', token);
    window.sessionStorage.setItem('adminTokenExpiration', Date.now() + expires_in * 1000);


    // Auto-logout and redirect when token expires
    setTimeout(() => {
      logoutAdmin();
      window.location.href = '/adminlogin';
    }, expires_in * 1000);

    setAdminAuthToken(token);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const logoutAdmin = () => {
  window.sessionStorage.removeItem('adminToken');
  window.sessionStorage.removeItem('adminTokenExpiration');
  setAdminAuthToken(null);
};