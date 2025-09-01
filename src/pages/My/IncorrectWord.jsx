import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WordList from "../../components/WordList";
import MultipleChoiceList from "../../components/MultipleChoiceList";
import AnswerFeedback from "../../components/AnswerFeedback";
import { wordServices } from "../../services/wordServices";
import useUserStore from "../../stores/userStore";

const IncorrectWord = ({ setActiveSubTab }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doStudy, setDoStudy] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // test input 값
  let [inputFlag, setInputFlag] = useState(false);
  // flag 변수, 피드백 출력시 입력 불가
  const currentWord = words[currentIdx];
  const { userId } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncorrectWords = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const wordData = await wordServices.getIncorrectWords();
        setWords(wordData);
      } catch (error) {
        console.error("Failed to fetch incorrect words:", error);
        // 404 오류는 백엔드가 준비되지 않은 경우이므로 조용히 처리
        if (error.response?.status === 404) {
          console.log("틀린 단어 API가 아직 준비되지 않았습니다.");
          setWords([]);
        } else {
          alert("틀린 단어 모음을 불러오는데 실패했습니다.");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIncorrectWords();
  }, [userId]);

  const deleteWord = async (incorrectWordId) => {
    try {
      // 새로운 틀린 단어 삭제 API 사용
      await wordServices.deleteIncorrectWord(incorrectWordId);
      setWords(words.filter((w) => w.incorrectWordId !== incorrectWordId));
    } catch (error) {
      console.error("Failed to delete incorrect word:", error);
      alert("틀린 단어 삭제에 실패했습니다.");
      navigate("/");
    }
  };

  const HandleStudyClick = () => {
    setDoStudy(!doStudy);
  };

  const handleSelectWord = (wordId) => {
    setSelectedWords((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedWords([]);
      setSelectAll(false);
    } else {
      setSelectedWords(words.map((word) => word.incorrectWordId));
      setSelectAll(true);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedWords.length === 0) {
      alert("삭제할 단어를 선택해주세요.");
      return;
    }

    if (
      !window.confirm(
        `선택된 ${selectedWords.length}개의 단어를 삭제하시겠습니까?`
      )
    ) {
      return;
    }

    try {
      // API 호출 - 선택된 단어들의 incorrectWordId 리스트 전달
      await wordServices.deleteIncorrectWords(selectedWords);

      // 성공적으로 삭제된 단어들을 목록에서 제거
      setWords(
        words.filter((word) => !selectedWords.includes(word.incorrectWordId))
      );
      setSelectedWords([]);
      setSelectAll(false);

      alert("선택된 단어가 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete selected words:", error);
      // 404 오류는 백엔드가 준비되지 않은 경우이므로 조용히 처리
      if (error.response?.status === 404) {
        console.log("틀린 단어 삭제 API가 아직 준비되지 않았습니다.");
        alert("틀린 단어 삭제 기능이 아직 준비되지 않았습니다.");
      } else {
        alert("단어 삭제에 실패했습니다.");
      }
    }
  };

  const handleSubmit = (e, selectedAnswer, isAnswerCorrect) => {
    e.preventDefault();
    setInputFlag(true);
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);

      setCurrentIdx((currentIdx + 1) % words.length);
      setInputFlag(false);
    }, 1500); // 1.5초 피드백 후 다음 문제 이동
  };

  if (loading) {
    return (
      <div className="relative bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Incorrect Words
          </h1>
          <p className="text-gray-600">틀린 단어 모음</p>
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Incorrect Words
        </h1>
        <p className="text-gray-600">틀린 단어 모음</p>
        <div
          className={`w-full ${
            doStudy ? "ml-[7%] " : "ml-[10%]"
          } max-w-2xl flex justify-end items-end gap-2`}
        >
          {!doStudy && (
            <button
              onClick={handleDeleteSelected}
              disabled={selectedWords.length === 0}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mb-2"
            >
              삭제
            </button>
          )}
          <button
            onClick={HandleStudyClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mb-2"
          >
            {doStudy ? "복습끝내기" : "복습하기"}
          </button>
        </div>
        {showFeedback && <AnswerFeedback isCorrect={isCorrect} />}
        {doStudy ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
              <div className="flex justify-between items-center mb-20">
                <span className="text-gray-700 font-semibold">
                  Q. 다음 단어에 알맞은 뜻은?
                </span>
              </div>
              <div className="mb-6 flex justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-14">
                  {currentWord?.word}
                </h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 justify-center items-center"
              ></form>
              <MultipleChoiceList
                currentWord={currentWord}
                handleSubmit={handleSubmit}
                inputFlag={inputFlag}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow ml-[10%]">
            <div className="bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 flex justify-between">
              <div className="w-[10%]">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="w-[35%]">단어</div>
              <div className="w-[35%]">뜻</div>
            </div>
            <div className="flex flex-col divide-y">
              {words.map(({ incorrectWordId, word, meaning }) => (
                <WordList
                  key={incorrectWordId}
                  id={incorrectWordId}
                  word={word}
                  meaning={meaning}
                  deleteWord={deleteWord}
                  isSelected={selectedWords.includes(incorrectWordId)}
                  onSelect={() => handleSelectWord(incorrectWordId)}
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

export default IncorrectWord;
