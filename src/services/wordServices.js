import apiClient from "./apiClients";

export const wordServices = {
  // 단어팩 출력 API
  getDailyWords: async (wordpackId) => {
    const response = await apiClient.get(
      `/api/words/daily?wordpackId=${wordpackId}`
    );
    return response.data;
  },

  // 단어팩 전체 단어 출력 API (객관식 테스트용)
  getAllWords: async (wordpackId) => {
    const response = await apiClient.get(
      `/api/words/all?wordpackId=${wordpackId}`
    );
    return response.data;
  },

  // 학습 진행도 API
  getWordpackProgress: async (userId) => {
    const response = await apiClient.get(
      `/api/wordpacks/progress?userId=${userId}`
    );
    return response.data;
  },

  addWord: async (wordData) => {
    const response = await apiClient.post("/api/words", wordData);
    return response.data;
  },

  updateWord: async (wordId, wordData) => {
    const response = await apiClient.put(`/api/words/${wordId}`, wordData);
    return response.data;
  },

  deleteWord: async (wordId) => {
    const response = await apiClient.delete(`/api/words/${wordId}`);
    return response.data;
  },

  // 내 단어장 관련
  getMyWords: async (userId) => {
    const response = await apiClient.get(`/api/user-words/user/${userId}`);
    return response.data;
  },

  addToMyWords: async (userId, wordId) => {
    const response = await apiClient.post("/api/user-words", {
      userId,
      wordId,
    });
    return response.data;
  },

  removeFromMyWords: async (userId, wordId) => {
    const response = await apiClient.delete("/api/user-words", {
      data: { userId, wordId },
    });
    return response.data;
  },

  // 틀린 단어 관련 (새로운 API 구조)
  getIncorrectWords: async (userId) => {
    const response = await apiClient.get(`/api/incorrect-words/user/${userId}`);
    return response.data;
  },

  deleteIncorrectWord: async (incorrectWordId) => {
    const response = await apiClient.delete(
      `/api/incorrect-words/${incorrectWordId}`
    );
    return response.data;
  },

  // Daily 주관식 테스트 결과 저장
  saveDailyTestResult: async (userId, words) => {
    const response = await apiClient.post("/api/words/test/daily", {
      userId,
      words,
    });
    return response.data;
  },

  // 단어팩 테스트(객관식) 결과 저장
  saveWordpackTestResult: async (userId, words) => {
    const response = await apiClient.post("/api/wordpack/test", {
      userId,
      words,
    });
    return response.data;
  },

  // 단어 학습 상태 업데이트
  updateWordStatus: async (wordId, status) => {
    const response = await apiClient.put(`/api/words/${wordId}/status`, {
      status,
    });
    return response.data;
  },

  // TTS 발음 재생 API
  getTTSAudio: async (word) => {
    const response = await apiClient.get(`/api/tts/${word}`, {
      responseType: "blob", // 음성 파일을 blob으로 받기
    });
    return response.data;
  },
};
