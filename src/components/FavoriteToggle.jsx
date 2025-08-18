import { useNavigate } from "react-router-dom";
import deactiveStar from "../assets/images/Freepik(DeactiveStar)-Flaticon.png";
import activeStar from "../assets/images/PixelPerfect(ActiveStar)-Flaticon.png";
import { wordServices } from "../services/wordServices";

const FavoriteToggle = ({ dev, wordId, favorites, setFavorites, userId }) => {
  const navigate = useNavigate();
  const isFavorite = favorites.some((word) => word.wordId === wordId);

  const toggleFavorite = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    dev && console.log("click toggle");
    dev && console.log(wordId);
    dev && console.log(favorites);
    dev && console.log(isFavorite);

    try {
      if (isFavorite) {
        // 내 단어장에서 삭제
        await wordServices.removeFromMyWords(userId, wordId);
        setFavorites((prev) => prev.filter((word) => word.wordId !== wordId));
      } else {
        // 내 단어장에 추가
        await wordServices.addToMyWords(userId, wordId);
        // 현재 단어 정보를 favorites에 추가
        const currentWord = favorites.find(
          (word) => word.wordId === wordId
        ) || {
          wordId,
          word: "단어",
          meaning: "뜻",
        };
        setFavorites((prev) => [...prev, { ...currentWord, isFavorite: true }]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      alert("단어 추가/삭제에 실패했습니다.");
      navigate("/");
    }
  };

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
