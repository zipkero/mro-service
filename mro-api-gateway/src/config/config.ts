export const getApiUrl = (baseUrl: string, path: string): string => {
  return `${baseUrl}${path}`;
};

export const API_BASE_URLS = {
  AUTH: '',
  USER: '',
};

export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
  },
  USER: {
    GET_USER: '/user',
  },
};
