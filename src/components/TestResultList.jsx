import FavoriteToggle from "./FavoriteToggle";
import useUserStore from "../stores/userStore";

const TestResultList = ({ dev, word, favorites, setFavorites }) => {
  const { userId } = useUserStore();
  const isCorrect = word.wrongCount === 0;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b ${
        isCorrect ? "bg-blue-50" : "bg-red-50"
      }`}
    >
      <div className="w-1/2 text-gray-700">{word.meaning}</div>
      <div
        className="w-1/3 font-semibold text-gray-800 notranslate"
        translate="no"
        lang="en"
      >
        {word.word}
      </div>
      <div className="w-1/4 text-gray-600 text-sm">{word.wrongCount}회</div>
      <div className="flex justify-center items-center w-1/12">
        <FavoriteToggle
          dev={dev}
          wordId={word.id}
          favorites={favorites}
          setFavorites={setFavorites}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default TestResultList;
