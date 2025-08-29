import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WordTestResult from "../../components/WordTestResult";
import AnswerFeedback from "../../components/AnswerFeedback";
import SubjectiveTest from "../../components/SubjectiveTest";
import useUserStore from "../../stores/userStore";
import useWordStore from "../../stores/wordStore";

const WordTest = ({ selectedWordPack }) => {
  const dev = false;
  //개발모드 활성화 시 모든 답안 정답 처리(함부로 true 처리 하지 말것, 배포 전 무조건 false 처리 필요)

  const [isFinished, setIsFinished] = useState(false);
  const [testWords, setTestWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [queue, setQueue] = useState([]);
  // 문제 단어 목록
  const [currentIdx, setCurrentIdx] = useState(0);
  // 현재 문제 단어
  const [userInput, setUserInput] = useState("");
  // test input 값
  let [inputFlag, setInputFlag] = useState(false);
  // flag 변수, 피드백 출력시 입력 불가
  const currentWord = queue[currentIdx];
  const { userId } = useUserStore();
  const { dailyWords, fetchDailyWords } = useWordStore();
  const navigate = useNavigate();

  useEffect(() => {
    const setupTestWords = async () => {
      if (!selectedWordPack) return;

      try {
        // wordStore에서 단어 가져옴
        let wordData = dailyWords;

        const wordsWithWrongCount = wordData.map((word) => ({
          ...word,
          wrongCount: 0,
        }));
        setTestWords(wordsWithWrongCount);
        setQueue(wordData);
      } catch (error) {
        console.error("Failed to fetch words:", error);
        const errorMessage =
          error.userMessage || "테스트 단어를 불러오는데 실패했습니다.";
        alert(errorMessage);
        navigate("/");
      }
    };

    setupTestWords();
  }, [selectedWordPack, dailyWords, fetchDailyWords, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputFlag(true);

    let isAnswerCorrect =
      userInput.trim().toLowerCase() === currentWord.word.toLowerCase();

    if (dev) {
      console.log("dev");
      isAnswerCorrect = true;
    }

    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);

      if (isAnswerCorrect) {
        const newQueue = queue.filter((_, idx) => idx !== currentIdx);
        if (newQueue.length === 0) {
          handleTestComplete();
        } else {
          setQueue(newQueue);
          setCurrentIdx(0);
        }
      } else {
        // 오답인 경우 wrongCount 증가
        const updatedTestWords = testWords.map((word) =>
          word.wordId === currentWord.wordId
            ? { ...word, wrongCount: word.wrongCount + 1 }
            : word
        );
        setTestWords(updatedTestWords);

        setCurrentIdx((currentIdx + 1) % queue.length);
      }

      setUserInput("");
      setInputFlag(false);
    }, 1500); // 1.5초 피드백 후 다음 문제 이동
  };

  const handleTestComplete = async () => {
    try {
      // Daily 테스트 결과 저장
      const { wordServices } = await import("../../services/wordServices");
      await wordServices.saveDailyTestResult(userId, testWords);
      setIsFinished(true);
    } catch (error) {
      console.error("Failed to save test result:", error);
      const errorMessage =
        error.userMessage || "테스트 결과 저장에 실패했습니다.";
      alert(errorMessage);
      navigate("/");
    }
  };

  if (isFinished) {
    return <WordTestResult dev={dev} testWords={testWords} />;
  }

  if (queue.length === 0) {
    return (
      <div className="relative bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Today's Test
          </h1>
          <p className="text-gray-600">학습한 단어를 테스트 해보세요</p>
        </div>
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Today's Test</h1>
        <p className="text-gray-600">학습한 단어를 테스트 해보세요</p>
      </div>
      {showFeedback && <AnswerFeedback isCorrect={isCorrect} />}
      <SubjectiveTest
        currentWord={currentWord}
        handleSubmit={handleSubmit}
        userInput={userInput}
        setUserInput={setUserInput}
        inputFlag={inputFlag}
      />
    </div>
  );
};

export default WordTest;
