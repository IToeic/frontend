import { create } from "zustand";

const useUserStore = create((set) => ({
  // 사용자 정보
  userId: null,
  username: null,
  isLoggedIn: false,

  // 로그인
  login: (userData) =>
    set({
      userId: userData.userId,
      username: userData.username || userData.userId, // username이 없으면 userId 사용
      isLoggedIn: true,
    }),

  // 로그아웃
  logout: () =>
    set({
      userId: null,
      username: null,
      isLoggedIn: false,
    }),

  // 사용자 정보 업데이트
  updateUser: (userData) =>
    set((state) => ({
      ...state,
      ...userData,
    })),
}));

export default useUserStore;
