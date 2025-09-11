import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import WordTestResult from "../../components/WordTestResult";
import MultipleChoiceTest from "../../components/MultipleChoiceTest";
// import { wordServices } from "../../services/wordServices";
// import useUserStore from "../../stores/userStore";
import wordSample from "../../mock/wordSample"; // 임시 연결

const WordPackTest = ({ dev, selectedWordPack }) => {
  // 개발 모드 활성화 시 모든 답안 정답 처리(함부로 true 처리 하지 말것, 배포 전 무조건 false 처리 필요)

  const [isFinished, setIsFinished] = useState(false);
  const [testWords, setTestWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [queue, setQueue] = useState([]);
  // 문제 단어 목록
  const [currentIdx, setCurrentIdx] = useState(0);
  // 현재 문제 단어
  let [inputFlag, setInputFlag] = useState(false);
  // flag 변수, 피드백 출력시 입력 불가
  const currentWord = queue[currentIdx];

  // 임시 연결 - mock 데이터 사용
  // const { userId } = useUserStore();
  // const navigate = useNavigate();

  useEffect(() => {
    // 임시 연결 - mock 데이터로 테스트 단어 설정 (3개만 사용)
    if (!selectedWordPack) return;

    const wordData = wordSample.slice(0, 3); // 처음 3개 단어만 사용
    const wordsWithWrongCount = wordData.map((word) => ({
      ...word,
      wrongCount: 0,
    }));
    setTestWords(wordsWithWrongCount);
    setQueue(wordData);
  }, [selectedWordPack]);

  // API 호출 부분 주석 처리
  // useEffect(() => {
  //   const fetchWords = async () => {
  //     if (!selectedWordPack) return;

  //     try {
  //       const wordData = await wordServices.getAllWords(selectedWordPack);
  //       const wordsWithWrongCount = wordData.map((word) => ({
  //         ...word,
  //         wrongCount: 0,
  //       }));
  //       setTestWords(wordsWithWrongCount);
  //       setQueue(wordData);
  //     } catch (error) {
  //       console.error("Failed to fetch words:", error);
  //       alert("테스트 단어를 불러오는데 실패했습니다.");
  //       navigate("/");
  //     }
  //   };

  //   fetchWords();
  // }, [selectedWordPack]);

  dev && console.log(testWords);

  const handleSubmit = (e, selectedAnswer, isAnswerCorrect) => {
    e.preventDefault();
    setInputFlag(true);

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

        // 현재 단어를 제외한 queue + 현재 단어를 뒤에 추가
        const newQueue = queue.filter((_, idx) => idx !== currentIdx);
        newQueue.push(currentWord); // 👈 현재 문제 단어를 뒤로 넣음

        setTestWords(updatedTestWords);
        setQueue(newQueue);
        setCurrentIdx(0); // 처음 문제부터 다시
      }

      setInputFlag(false);
    }, 1500); // 1.5초 피드백 후 다음 문제 이동
  };

  const handleTestComplete = async () => {
    // 임시 연결 - API 호출 없이 바로 완료 처리
    setIsFinished(true);

    // API 호출 부분 주석 처리
    // try {
    //   // 단어팩 테스트 결과 저장
    //   await wordServices.saveWordpackTestResult(userId, testWords);
    //   setIsFinished(true);
    // } catch (error) {
    //   console.error("Failed to save test result:", error);
    //   alert("테스트 결과 저장에 실패했습니다.");
    //   navigate("/");
    // }
  };

  if (isFinished) {
    return <WordTestResult dev={dev} testWords={testWords} />;
  }

  if (queue.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Vocabulary Test
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              단어장 테스트 해보세요
            </p>
          </div>
          <div className="text-center text-sm sm:text-base">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Vocabulary Test
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            단어장 테스트 해보세요
          </p>
        </div>
        <MultipleChoiceTest
          currentWord={currentWord}
          handleSubmit={handleSubmit}
          inputFlag={inputFlag}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />
      </div>
    </div>
  );
};

export default WordPackTest;
