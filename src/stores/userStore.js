import { create } from "zustand";

const useUserStore = create((set) => ({
  // 사용자 정보 - 세션에서 초기값 가져오기
  userId: sessionStorage.getItem('userId') || null,
  username: sessionStorage.getItem('username') || null,
  isLoggedIn: !!sessionStorage.getItem('userId'),

  // 로그인
  login: (userData) => {
    sessionStorage.setItem('userId', userData.userId);
    sessionStorage.setItem('username', userData.name || userData.userId);
    set({
      userId: userData.userId,
      username: userData.name || userData.userId,
      isLoggedIn: true,
    });
  },

  // 로그아웃
  logout: () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    set({
      userId: null,
      username: null,
      isLoggedIn: false,
    });
  },

  // 사용자 정보 업데이트
  updateUser: (userData) => {
    if (userData.userId) {
      sessionStorage.setItem('userId', userData.userId);
    }
    if (userData.username) {
      sessionStorage.setItem('username', userData.username);
    }
    set((state) => ({
      ...state,
      ...userData,
    }));
  },
}));

export default useUserStore;
