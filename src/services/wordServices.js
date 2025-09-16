import apiClient from "./apiClients";

export const wordServices = {
  // 단어팩 출력 API (오늘 날짜 기준)
  getDailyWords: async (wordpackId, userId) => {
    const response = await apiClient.get(
      `/api/words/daily?wordpackId=${wordpackId}&userId=${userId}`
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
    const response = await apiClient.get(`/api/user-words`);
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

  // 내 단어장에서 여러 단어 삭제
  deleteMyWords: async (userId, wordIds) => {
    const response = await apiClient.delete("/api/user-words", {
      data: { userId, wordIds },
    });
    return response.data;
  },

  // 틀린 단어 관련
  getIncorrectWords: async () => {
    const response = await apiClient.get(`/api/incorrect-words`);
    return response.data;
  },

  // 틀린 단어에서 여러 단어 삭제
  deleteIncorrectWords: async (wordIds) => {
    const response = await apiClient.delete("/api/incorrect-words", {
      data: { wordIds },
    });
    return response.data;
  },

  // 단어팩별 틀린 단어 개수 조회
  getIncorrectWordsCountByPack: async (packId) => {
    const response = await apiClient.get(`/api/incorrect-words/pack/${packId}`);
    return response.data;
  },

  // Daily 주관식 테스트 결과 저장
  saveDailyTestResult: async (words) => {
    const response = await apiClient.post("/api/words/test/daily", {
      words,
    });
    return response.data;
  },

  // 새로운 단어 생성 API (pending 상태로)
  startNewWordSet: async (wordpackId, userId) => {
    const response = await apiClient.post("/api/words/test/start-set", {
      wordpackId,
      userId,
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

  // 학습 단어 저장 API
  saveLearningWord: async (wordId) => {
    const response = await apiClient.post("/api/words/test/learning-word", {
      wordId: wordId,
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
