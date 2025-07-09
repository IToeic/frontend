import { useState } from "react";
import wordSample from "../mock/wordSample";
import WordTestResult from "../components/WordTestResult";
import AnswerFeedback from "../components/AnswerFeedback";
import SubjectiveTest from "../components/SubjectiveTest";

const WordTest = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [testWords, setTestWords] = useState(
    wordSample.map((word) => ({
      ...word,
      wrongCount: 0,
    }))
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [queue, setQueue] = useState([...wordSample]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState("");

  const currentWord = queue[currentIdx];

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAnswerCorrect =
      userInput.trim().toLowerCase() === currentWord.word.toLowerCase();

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
          setCurrentIdx(currentIdx % newQueue.length);
        }
      } else {
        // 오답인 경우 wrongCount 증가
        const updatedTestWords = testWords.map((word) =>
          word.id === currentWord.id
            ? { ...word, wrongCount: word.wrongCount + 1 }
            : word
        );
        setTestWords(updatedTestWords);

        setCurrentIdx((currentIdx + 1) % queue.length);
      }

      setUserInput("");
    }, 1500); // 1.5초 피드백 후 다음 문제 이동
  };

  if (isFinished) {
    return <WordTestResult testWords={testWords} />;
  }

  return (
    <div className="relative">
      {showFeedback && <AnswerFeedback isCorrect={isCorrect} />}
      <SubjectiveTest
        currentWord={currentWord}
        handleSubmit={handleSubmit}
        userInput={userInput}
        setUserInput={setUserInput}
      />
    </div>
  );
};

export default WordTest;
