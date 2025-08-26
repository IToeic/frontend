import { create } from "zustand";
import { wordServices } from "../services/wordServices";

const useWordStore = create((set, get) => ({
  dailyWords: [],
  loading: false,
  error: null,

  fetchDailyWords: async (wordpackId) => {
    if (!wordpackId) return;

    set({ loading: true, error: null });

    try {
      const wordData = await wordServices.getDailyWords(wordpackId);
      set({ dailyWords: wordData, loading: false });
      return wordData;
    } catch (error) {
      console.error("Failed to fetch daily words:", error);
      set({
        error: error.message,
        loading: false,
      });
      throw error;
    }
  },

  clearWords: () => {
    set({ dailyWords: [], loading: false, error: null });
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
