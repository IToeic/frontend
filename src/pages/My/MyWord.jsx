import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WordList from "../../components/WordList";
import WordCard from "../../components/WordCard";
import { wordServices } from "../../services/wordServices";
import useUserStore from "../../stores/userStore";

const MyWord = ({ setActiveSubTab }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doStudy, setDoStudy] = useState(false);
  const { userId } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyWords = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const wordData = await wordServices.getMyWords(userId);
        setWords(wordData);
      } catch (error) {
        console.error("Failed to fetch my words:", error);
        alert("내 단어장을 불러오는데 실패했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchMyWords();
  }, [userId]);

  const deleteWord = async (wordId) => {
    if (!userId) {
      alert("사용자 정보가 없습니다.");
      return;
    }

    try {
      await wordServices.removeFromMyWords(userId, wordId);
      setWords(words.filter((w) => w.wordId !== wordId));
    } catch (error) {
      console.error("Failed to delete word:", error);
      alert("단어 삭제에 실패했습니다.");
      navigate("/");
    }
  };

  const HandleStudyClick = () => {
    setDoStudy(!doStudy);
  };

  if (loading) {
    return (
      <div className="relative bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Words</h1>
          <p className="text-gray-600">내 단어장</p>
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Words</h1>
        <p className="text-gray-600">내 단어장</p>
        <div
          className={`w-full ${
            doStudy ? "" : "ml-[10%] max-w-2xl"
          } flex justify-end align-right `}
        >
          <button
            onClick={HandleStudyClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mb-2"
          >
            {doStudy ? "학습끝내기" : "학습하기"}
          </button>
        </div>

        {doStudy ? (
          <WordCard
            words={words}
            setActiveSubTab={setActiveSubTab}
            page="MyWord"
          />
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow ml-[10%]">
            <div className="bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 flex justify-between">
              <div className="w-[40%]">단어</div>
              <div className="w-[40%]">뜻</div>
              <div className="w-[20%] text-right">삭제</div>
            </div>
            <div className="flex flex-col divide-y">
              {words.map(({ wordId, word, meaning }) => (
                <WordList
                  key={wordId}
                  id={wordId}
                  word={word}
                  meaning={meaning}
                  deleteWord={deleteWord}
                />
              ))}
              {words.length === 0 && (
                <div className="px-4 py-6 text-center text-gray-500">
                  단어가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWord;
