import deactiveStar from "../assets/images/Freepik(DeactiveStar)-Flaticon.png";
import activeStar from "../assets/images/PixelPerfect(ActiveStar)-Flaticon.png";
import wordSample from "../mock/wordSample";

const FavoriteToggle = ({ dev, wordId, favorites, setFavorites }) => {
  const isFavorite = favorites.some((word) => word.id === wordId);

  const toggleFavorite = () => {
    dev && console.log("click toggle");
    dev && console.log(wordId);
    dev && console.log(favorites);
    dev && console.log(isFavorite);
    const isAlreadyFavorite = favorites.some((word) => word.id === wordId);

    if (isAlreadyFavorite) {
      setFavorites((prev) => prev.filter((word) => word.id !== wordId));
    } else {
      const wordToAdd = wordSample.find((word) => word.id === wordId);
      if (wordToAdd) {
        setFavorites((prev) => [...prev, { ...wordToAdd, isFavorite: true }]);
      }
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
