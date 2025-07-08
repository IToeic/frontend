import { useState } from "react";
import wordSample from "../mock/wordSample";
import WordTestResult from "../components/WordTestResult";
import WordTestQuiz from "../components/WordTestQuiz";

const WordTest = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [testWords, setTestWords] = useState(
    wordSample.map((word) => ({
      ...word,
      wrongCount: 0,
    }))
  );
  const [queue, setQueue] = useState([...testWords]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState("");

  // 현재 문제
  const currentWord = queue[currentIdx];

  // 정답 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    //뜻이 나왔으니까 단어가 맞아야 되지
    if (userInput.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      //정답일 경우
      // 정답: 큐에서 제거
      const newQueue = queue.filter((_, idx) => idx !== currentIdx);
      if (newQueue.length === 0) {
        setIsFinished(true);
        //모든 문제를 풀었으면 종료 후 결과 페이지
        return;
      } else {
        //다음 문제로 이동
        setQueue(newQueue);
        setCurrentIdx(currentIdx % newQueue.length);
        setUserInput("");
      }
    } else {
      //오답일 경우
      setTestWords(
        testWords.map((word, idx) =>
          idx === currentIdx
            ? { ...word, wrongCount: word.wrongCount + 1 }
            : word
        )
      );
      setCurrentIdx((currentIdx + 1) % queue.length);
      setUserInput("");
    }
  };

  if (isFinished) {
    return <WordTestResult testWords={testWords} />;
  } else {
    return (
      <WordTestQuiz
        currentWord={currentWord}
        handleSubmit={handleSubmit}
        userInput={userInput}
        setUserInput={setUserInput}
      />
    );
  }
};

export default WordTest;
