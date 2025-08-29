import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // 세션/쿠키 기반 인증을 위해 필수
});

// 요청 인터셉터 - 요청 전에 실행
apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 응답 후에 실행
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    // 상태 코드별 에러 메시지 정의
    const getErrorMessage = (status, defaultMessage) => {
      switch (status) {
        case 400:
          return "잘못된 요청입니다. 입력 정보를 확인해주세요.";
        case 401:
          return "인증이 필요합니다. 로그인해주세요.";
        case 403:
          return "접근 권한이 없습니다.";
        case 404:
          return "요청한 리소스를 찾을 수 없습니다.";
        case 409:
          return "이미 존재하는 데이터입니다.";
        case 422:
          return "입력 데이터가 올바르지 않습니다.";
        case 429:
          return "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.";
        case 500:
          return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        case 502:
          return "서버가 일시적으로 사용할 수 없습니다.";
        case 503:
          return "서비스가 일시적으로 중단되었습니다.";
        case 504:
          return "서버 응답 시간이 초과되었습니다.";
        default:
          return defaultMessage || "알 수 없는 오류가 발생했습니다.";
      }
    };

    // 에러 객체에 사용자 친화적인 메시지 추가
    if (error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data?.message;

      error.userMessage = serverMessage || getErrorMessage(status);
      error.status = status;

      // 404 에러는 백엔드가 준비되지 않은 경우이므로 조용히 처리
      if (status === 404) {
        console.log("API 엔드포인트가 준비되지 않았습니다:", error.config?.url);
      } else {
        console.error("API Error:", {
          status: status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          method: error.config?.method,
          message: error.userMessage,
          data: error.response?.data,
        });
      }
    } else if (error.request) {
      // 네트워크 오류
      error.userMessage = "네트워크 연결을 확인해주세요.";
      error.status = "NETWORK_ERROR";

      if (error.code === "ERR_NETWORK" && error.message === "Network Error") {
        console.warn(
          "CORS 에러가 발생했습니다. 백엔드 CORS 설정을 확인해주세요."
        );
      }
    } else {
      // 기타 오류
      error.userMessage = "알 수 없는 오류가 발생했습니다.";
      error.status = "UNKNOWN_ERROR";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
