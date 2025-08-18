// 즐겨찾기 관련 API

import api from "./api";

export const toggleFavoriteInDB = async (wordId, isFavorite) => {
  const response = await api.post("/favorites/toggle", {
    wordId,
    isFavorite,
  });
  return response.data;
};

export const getFavoriteWords = async () => {
  const response = await api.get("/favorites");
  return response.data;
};
