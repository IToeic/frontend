import { useState, useEffect } from "react";
import deactiveStar from "../assets/images/Freepik(DeactiveStar)-Flaticon.png";
import activeStar from "../assets/images/PixelPerfect(ActiveStar)-Flaticon.png";
import { wordServices } from "../services/wordServices";
import useUserStore from "../stores/userStore";

const FavoriteToggle = ({ dev, wordId }) => {
  const { userId } = useUserStore();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 내 단어장 목록 조회
  useEffect(() => {
    const fetchMyWords = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const wordData = await wordServices.getMyWords(userId);
        // wordId 배열로 변환
        const favoriteIds = wordData.map((word) => word.wordId);
        setFavorites(favoriteIds);
      } catch (error) {
        console.error("Failed to fetch my words:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyWords();
  }, [userId]);

  const isFavorite = favorites.includes(wordId);

  const toggleFavorite = async () => {
    dev && console.log("click toggle");
    dev && console.log(wordId);
    dev && console.log(isFavorite);

    try {
      if (isFavorite) {
        // 내 단어장에서 삭제
        await wordServices.removeFromMyWords(userId, wordId);
        setFavorites((prev) => prev.filter((id) => id !== wordId));
      } else {
        // 내 단어장에 추가
        await wordServices.addToMyWords(userId, wordId);
        setFavorites((prev) => [...prev, wordId]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      alert("단어 추가/삭제에 실패했습니다.");
    }
  };

  // 로딩 중이거나 userId가 없으면 빈 버튼 표시
  if (loading || !userId) {
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
