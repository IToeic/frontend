import React from "react";
import deactiveStar from "../assets/images/Freepik(DeactiveStar)-Flaticon.png";
import activeStar from "../assets/images/PixelPerfect(ActiveStar)-Flaticon.png";

const FavoriteToggle = ({ dev, wordId, favorites, setFavorites, userId }) => {
  // 임시 연결 - mock 데이터 사용
  const loading = false;

  // 임시 연결 - mock 데이터로 즐겨찾기 상태 관리
  const isFavorite =
    favorites?.some((fav) => fav.wordId === wordId || fav.id === wordId) ||
    false;

  const toggleFavorite = async () => {
    dev && console.log("click toggle");
    dev && console.log(wordId);
    dev && console.log(isFavorite);

    // 임시 연결 - 로컬에서만 즐겨찾기 상태 변경
    if (isFavorite) {
      // 즐겨찾기에서 제거
      setFavorites((prev) =>
        (prev || []).filter((fav) => fav.wordId !== wordId && fav.id !== wordId)
      );
    } else {
      // 즐겨찾기에 추가
      const newFavorite = {
        wordId: wordId,
        id: wordId,
        word: "mock word",
        meaning: "mock meaning",
      };
      setFavorites((prev) => [...(prev || []), newFavorite]);
    }

    // API 호출 부분 주석 처리
    // try {
    //   if (isFavorite) {
    //     // 내 단어장에서 삭제
    //     await wordServices.removeFromMyWords(userId, wordId);
    //     setFavorites((prev) => prev.filter((id) => id !== wordId));
    //   } else {
    //     // 내 단어장에 추가
    //     await wordServices.addToMyWords(userId, wordId);
    //     setFavorites((prev) => [...prev, wordId]);
    //   }
    // } catch (error) {
    //   console.error("Failed to toggle favorite:", error);
    //   alert("단어 추가/삭제에 실패했습니다.");
    // }
  };

  // 임시 연결 - 항상 활성화된 버튼 표시
  if (loading) {
    return (
      <button
        disabled
        className="p-2 rounded-full transition-colors duration-200 opacity-50"
      >
        <img src={deactiveStar} alt="favorite" className="w-6 h-6" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
    >
      <img
        src={isFavorite ? activeStar : deactiveStar}
        alt="favorite"
        className="w-6 h-6"
      />
    </button>
  );
};

export default FavoriteToggle;
