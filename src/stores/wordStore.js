import { create } from "zustand";
import { wordServices } from "../services/wordServices";

const useWordStore = create((set, get) => ({
  dailyWords: [],
  loading: false,
  error: null,
  lastFetchDate: null,

  // 오전 12시를 기준으로 하루가 바뀌었는지 확인
  isNewDay: () => {
    const now = new Date();
    const lastFetch = get().lastFetchDate;

    if (!lastFetch) return true;

    const lastFetchDate = new Date(lastFetch);

    // 오전 12시를 기준으로 날짜 비교
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const lastFetchStart = new Date(
      lastFetchDate.getFullYear(),
      lastFetchDate.getMonth(),
      lastFetchDate.getDate()
    );

    return todayStart > lastFetchStart;
  },

  fetchDailyWords: async (wordpackId) => {
    if (!wordpackId) return;

    // 하루가 바뀌지 않았고 이미 데이터가 있으면 캐시된 데이터 사용
    if (!get().isNewDay() && get().dailyWords.length > 0) {
      console.log("Using cached daily words - same day");
      return get().dailyWords;
    }

    set({ loading: true, error: null });

    try {
      const wordData = await wordServices.getDailyWords(wordpackId);
      set({
        dailyWords: wordData,
        loading: false,
        lastFetchDate: new Date().toISOString(),
      });
      console.log("Fetched new daily words - new day or first time");
      return wordData;
    } catch (error) {
      console.error("Failed to fetch daily words:", error);
      set({
        error: error.userMessage || error.message,
        loading: false,
      });
      throw error;
    }
  },

  clearWords: () => {
    set({ dailyWords: [], loading: false, error: null, lastFetchDate: null });
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
