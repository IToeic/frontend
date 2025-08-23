import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,  // 세션/쿠키 기반 인증을 위해 필수
});

// 요청 인터셉터 - 요청 전에 실행
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 응답 후에 실행
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // 404 에러는 백엔드가 준비되지 않은 경우이므로 조용히 처리
    if (error.response?.status === 404) {
      console.log('API 엔드포인트가 준비되지 않았습니다:', error.config?.url);
    } else {
      console.error('API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
        message: error.message,
        data: error.response?.data
      });
    }

    // CORS 에러 처리
    if (error.code === 'ERR_NETWORK' && error.message === 'Network Error') {
      console.warn('CORS 에러가 발생했습니다. 백엔드 CORS 설정을 확인해주세요.');
    }

    // 401 에러 처리 (인증 실패)
    if (error.response?.status === 401) {
      console.warn('인증이 필요합니다. 로그인 페이지로 이동하세요.');
    }

    // 500 에러 처리 (서버 오류)
    if (error.response?.status === 500) {
      console.error('서버 오류가 발생했습니다.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
