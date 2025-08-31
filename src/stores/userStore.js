import { create } from "zustand";

const useUserStore = create((set, get) => ({
  // 사용자 정보 - 세션에서 초기값 가져오기
  userId: sessionStorage.getItem("userId") || null,
  username: sessionStorage.getItem("username") || null,
  isLoggedIn: !!sessionStorage.getItem("userId"),

  // 로그인
  login: (userData) => {
    sessionStorage.setItem("userId", userData.userId);
    sessionStorage.setItem("username", userData.name || userData.userId);
    set({
      userId: userData.userId,
      username: userData.name || userData.userId,
      isLoggedIn: true,
    });
  },

  // 로그아웃
  logout: () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    set({
      userId: null,
      username: null,
      isLoggedIn: false,
    });

    // wordStore 초기화
    import("./wordStore")
      .then(({ default: useWordStore }) => {
        const wordStore = useWordStore.getState();
        wordStore.resetOnLogout();
      })
      .catch((error) => {
        console.error("Failed to reset wordStore:", error);
      });

    // 전역 상태 초기화를 위한 이벤트 발생
    window.dispatchEvent(new CustomEvent("userLogout"));
  },

  // 사용자 정보 업데이트
  updateUser: (userData) => {
    if (userData.userId) {
      sessionStorage.setItem("userId", userData.userId);
    }
    if (userData.username) {
      sessionStorage.setItem("username", userData.username);
    }
    set((state) => ({
      ...state,
      ...userData,
    }));
  },

  // 세션 만료 처리
  handleSessionExpired: () => {
    console.log("세션이 만료되었습니다. 자동 로그아웃 처리합니다.");
    console.log("현재 세션 상태:", {
      userId: sessionStorage.getItem("userId"),
      username: sessionStorage.getItem("username"),
    });
    get().logout();
  },
}));

export default useUserStore;
