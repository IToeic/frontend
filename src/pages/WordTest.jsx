import { useState } from "react";
import wordSample from "../constant/wordSample";

const WordTest = () => {
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
    if (userInput.trim() === currentWord.meaning) {
      // 정답: 큐에서 제거
      const newQueue = queue.filter((_, idx) => idx !== currentIdx);
      if (newQueue.length === 0) {
      } else {
        setQueue(newQueue);
        setCurrentIdx(currentIdx % newQueue.length);
      }
    } else {
      // 오답: wrongCount 증가, 큐는 그대로
      setQueue(
        queue.map((word, idx) =>
          idx === currentIdx
            ? { ...word, wrongCount: word.wrongCount + 1 }
            : word
        )
      );
      // 다음 문제로 이동
      setCurrentIdx((currentIdx + 1) % queue.length);
    }
    setUserInput("");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-20">
          <span className="text-gray-700 font-semibold">
            Q. 다음 뜻에 알맞은 단어는?
          </span>
        </div>
        <div className="mb-6 flex justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-14">
            {currentWord.word}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 justify-center items-center"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border rounded px-4 py-2 text-lg w-[80%] mb-10"
            placeholder="단어를 입력하세요"
            autoFocus
          />
          <div className="flex space-x-2 w-[80%]">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              채점
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WordTest;
