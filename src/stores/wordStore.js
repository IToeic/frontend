import { create } from "zustand";
import { wordServices } from "../services/wordServices";

// 중복 호출 방지를 위한 플래그
let isFetching = false;

const useWordStore = create((set, get) => ({
  dailyWords: [],
  loading: false,
  error: null,

  fetchDailyWords: async (wordpackId, userId) => {
    if (!wordpackId || !userId) return;

    // 중복 호출 방지
    if (isFetching) {
      return get().dailyWords;
    }

    // 이미 데이터가 있으면 캐시된 데이터 사용
    if (get().dailyWords.length > 0) {
      return get().dailyWords;
    }

    isFetching = true;
    set({ loading: true, error: null });

    try {
      // 1. 오늘 날짜의 단어 조회
      const wordData = await wordServices.getDailyWords(wordpackId, userId);

      // 2. 단어가 없으면 새로운 단어 생성
      if (!wordData || wordData.length === 0) {
        const newWordData = await wordServices.startNewWordSet(
          wordpackId,
          userId
        );

        set({
          dailyWords: newWordData,
          loading: false,
        });
        isFetching = false;
        return newWordData;
      }

      // 3. 기존 단어가 있으면 그대로 사용
      set({
        dailyWords: wordData,
        loading: false,
      });
      isFetching = false;
      return wordData;
    } catch (error) {
      console.error("Failed to fetch daily words:", error);
      set({
        error: error.userMessage || error.message,
        loading: false,
      });
      isFetching = false;
      throw error;
    }
  },

  clearWords: () => {
    set({ dailyWords: [], loading: false, error: null });
  },

  resetOnLogout: () => {
    set({ dailyWords: [], loading: false, error: null });
    isFetching = false;
  },

  getDailyWords: () => {
    return get().dailyWords;
  },

  isLoading: () => {
    return get().loading;
  },

  getError: () => {
    return get().error;
  },
}));

export default useWordStore;
