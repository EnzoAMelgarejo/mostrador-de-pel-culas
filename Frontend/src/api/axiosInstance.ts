import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

// Interceptor para agregar token a cada request
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('AccessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores 401 y refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const isRefreshing = originalRequest.url.includes('/auth/refresh-token');
    const isLoginOrRegister = window.location.pathname === '/login' || window.location.pathname === '/register';

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing && !isLoginOrRegister) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/auth/refresh-token');
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('AccessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('No se pudo refrescar el token:', refreshError);
        // En vez de redirigir directamente, limpiamos token y dejamos que el flujo natural actúe
        localStorage.removeItem('AccessToken');
        return Promise.reject(refreshError); // Dejá que el componente maneje el error
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
