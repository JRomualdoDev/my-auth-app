import axios, { AxiosError, AxiosInstance } from 'axios';
import { useAuthStore } from './store/auth-store';

// Extend the AxiosInstance type to include isAxiosError
interface ExtendedAxiosInstance extends AxiosInstance {
  isAxiosError: <T = unknown, D = unknown>(error: unknown) => error is AxiosError<T, D>;
}

// Create instance with the extended type
const axios_api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
}) as ExtendedAxiosInstance;

// Add isAxiosError method to the instance
axios_api.isAxiosError = axios.isAxiosError;

// Interceptor para adicionar token a todas as requisições
axios_api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para refresh automático do token
axios_api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Se o erro for 401 e não for uma tentativa de refresh ou login
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== '/auth/refresh' &&
      originalRequest.url !== '/auth/login'
    ) {
      originalRequest._retry = true;
      
      try {
        // Tentar obter novo token
        const response = await axios.post('/api/auth/refresh');
        const { accessToken } = response.data;
        
        // Atualizar o token no store
        useAuthStore.getState().setAuth(
          accessToken, 
          useAuthStore.getState().user!
        );
        
        // Reenviar a requisição original com o novo token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Se falhar o refresh, fazer logout
        useAuthStore.getState().clearAuth();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios_api;