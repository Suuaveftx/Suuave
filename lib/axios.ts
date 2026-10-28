import axios from 'axios';
import { authClient } from './auth-client';

const apiBaseURL =
  process.env.NEXT_PUBLIC_APP_PRODUCTION_URL || process.env.NEXT_PUBLIC_APP_STAGING_URL;

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (!config.baseURL && !apiBaseURL) {
      return Promise.reject(
        new Error(
          'API base URL is not configured. Set NEXT_PUBLIC_API_URL or the environment-specific API URL.'
        )
      );
    }

    if (typeof window !== 'undefined') {
      const { data: sessionData } = await authClient.getSession();
      const sessionToken = sessionData?.session?.token;

      if (sessionToken) {
        config.headers.set('Authorization', `Bearer ${sessionToken}`);
      }
    }

    config.headers.set('Accept', 'application/json');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: unknown) => {
    const originalRequest = axios.isAxiosError(error) ? error.config : undefined;
    if (
      originalRequest &&
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      typeof window !== 'undefined' &&
      window.location.pathname !== '/auth/login-options'
    ) {
      window.location.href = '/auth/login-options';
    }
    return Promise.reject(error);
  }
);
