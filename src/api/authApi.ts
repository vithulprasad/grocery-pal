import axiosClient from './axiosClient';

export const loginUser = async (email: string, password: string) => {
  // Dummy - in production: return axiosClient.post('/login', { email, password });
  return {
    data: {
      token: 'dummy-jwt-token',
      user: { id: '1', email, name: 'John Doe' },
    },
  };
};

export const signupUser = async (email: string, password: string) => {
  // Dummy - in production: return axiosClient.post('/signup', { email, password });
  return {
    data: {
      token: 'dummy-jwt-token',
      user: { id: '1', email, name: email.split('@')[0] },
    },
  };
};
