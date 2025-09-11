import FavoriteToggle from "./FavoriteToggle";
import useUserStore from "../stores/userStore";

const TestResultList = ({ dev, word, favorites, setFavorites }) => {
  const { userId } = useUserStore();
  const isCorrect = word.wrongCount === 0;

  // 모바일에서만 뜻을 줄바꿈으로 처리하는 함수
  const renderMeaning = (meaning) => {
    return (
      <div>
        <div className="block sm:hidden">
          {meaning.includes(",") ? (
            <div className="space-y-1">
              {meaning.split(",").map((m, index) => (
                <div key={index} className="text-gray-700 text-xs">
                  {m.trim()}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-700 text-xs">{meaning}</div>
          )}
        </div>
        <div className="hidden sm:block text-gray-700 text-sm">{meaning}</div>
      </div>
    );
  };

  return (
    <tr className={`border-b ${isCorrect ? "bg-blue-50" : "bg-red-50"}`}>
      <td className="px-2 sm:px-4 py-3 text-gray-700 text-xs sm:text-sm">
        {renderMeaning(word.meaning)}
      </td>
      <td
        className="px-2 sm:px-4 py-3 font-semibold text-gray-800 notranslate text-sm"
        translate="no"
        lang="en"
      >
        {word.word}
      </td>
      <td className="px-2 sm:px-4 py-3 text-gray-600 text-xs sm:text-sm text-center">
        {word.wrongCount}회
      </td>
      <td className="px-2 sm:px-4 py-3 text-center min-w-[60px]">
        <FavoriteToggle
          dev={dev}
          wordId={word.wordId || word.id}
          favorites={favorites}
          setFavorites={setFavorites}
          userId={userId}
        />
      </td>
    </tr>
  );
};

export default TestResultList;
