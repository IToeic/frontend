import { useState } from "react";
import WordTestResult from "../components/WordTestResult";
import AnswerFeedback from "../components/AnswerFeedback";
import MultipleChoiceTest from "../components/MultipleChoiceTest";
import wordPackSample from "../mock/wordPackSample";

const WordPackTest = () => {
  const dev = false;
  // 개발 모드 활성화 시 모든 답안 정답 처리(함부로 true 처리 하지 말것, 배포 전 무조건 false 처리 필요)

  const [isFinished, setIsFinished] = useState(false);
  const [testWords, setTestWords] = useState(
    wordPackSample.map((word) => ({
      ...word,
      wrongCount: 0,
    }))
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [queue, setQueue] = useState([...wordPackSample]);
  // 문제 단어 목록
  const [currentIdx, setCurrentIdx] = useState(0);
  // 현재 문제 단어
  const [userInput, setUserInput] = useState("");
  // test input 값
  let [inputFlag, setInputFlag] = useState(false);
  // flag 변수, 피드백 출력시 입력 불가
  const currentWord = queue[currentIdx];

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
          setIsFinished(true);
        } else {
          setQueue(newQueue);
          setCurrentIdx(0);
        }
      } else {
        // 오답인 경우 wrongCount 증가
        // 오답인 경우 wrongCount 증가
        const updatedTestWords = testWords.map((word) =>
          word.id === currentWord.id
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

  if (isFinished) {
    return <WordTestResult dev={dev} testWords={testWords} />;
  }

  return (
    <div className="relative bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Vocabulary Test
        </h1>
        <p className="text-gray-600">단어장 테스트 해보세요</p>
      </div>
      {showFeedback && <AnswerFeedback isCorrect={isCorrect} />}
      <MultipleChoiceTest
        setUserInput={setUserInput}
        currentWord={currentWord}
        handleSubmit={handleSubmit}
        inputFlag={inputFlag}
      />
    </div>
  );
};

export default WordPackTest;
