// axios 기본 설정 (공통)

//예시
import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api.com/api", // 나중에 백엔드 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
