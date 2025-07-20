import { useState } from "react";
import WordList from "../components/WordList";
import myWordSample from "../mock/myWordSample";
import MultipleChoiceTest from "../components/MultipleChoiceTest";

const IncorrectWord = ({ setActiveSubTab }) => {
  const [words, setWords] = useState(myWordSample);

  const deleteWord = (id) => {
    setWords(words.filter((w) => w.id !== id));
  };
  //삭제 기능 나중에 db 연결 후 다시 구현

  let [doStudy, setDoStudy] = useState(false);

  const HandleStudyClick = () => {
    setDoStudy(!doStudy);
  };
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  // test input 값
  let [inputFlag, setInputFlag] = useState(false);
  // flag 변수, 피드백 출력시 입력 불가
  const currentWord = words[currentIdx];

  const handleSubmit = (e, selectedAnswer, isAnswerCorrect) => {
    //   e.preventDefault();
    //   setInputFlag(true);
    //   setIsCorrect(isAnswerCorrect);
    //   setShowFeedback(true);
    //   setTimeout(() => {
    //     setShowFeedback(false);
    //     if (isAnswerCorrect) {
    //       const newQueue = words.filter((_, idx) => idx !== currentIdx);
    //       if (newQueue.length === 0) {
    //         setIsFinished(true);
    //       } else {
    //         setWords(newQueue);
    //         setCurrentIdx(0);
    //       }
    //     } else {
    //       // 오답인 경우 wrongCount 증가
    //       // 오답인 경우 wrongCount 증가
    //       const updatedTestWords = testWords.map((word) =>
    //         word.id === currentWord.id
    //           ? { ...word, wrongCount: word.wrongCount + 1 }
    //           : word
    //       );
    //       // 현재 단어를 제외한 words + 현재 단어를 뒤에 추가
    //       const newQueue = words.filter((_, idx) => idx !== currentIdx);
    //       newQueue.push(currentWord); // 👈 현재 문제 단어를 뒤로 넣음
    //       setTestWords(updatedTestWords);
    //       setWords(newQueue);
    //       setCurrentIdx(0); // 처음 문제부터 다시
    //     }
    //     setInputFlag(false);
    //   }, 1500); // 1.5초 피드백 후 다음 문제 이동
  };

  return (
    <div className="relative bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Incorrect Words
        </h1>
        <p className="text-gray-600">틀린 단어 모음</p>
        <div
          className={`w-full ${
            doStudy ? "" : "ml-[10%] max-w-2xl"
          } flex justify-end align-right `}
        >
          <button
            onClick={HandleStudyClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mb-2"
          >
            {doStudy ? "복습끝내기" : "복습하기"}
          </button>
        </div>

        {doStudy ? (
          // MultipleChoiceTest.jsx 띄워야 함
          <MultipleChoiceTest
            setUserInput={setUserInput}
            currentWord={currentWord}
            handleSubmit={handleSubmit}
            inputFlag={inputFlag}
          />
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow ml-[10%]">
            <div className="bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 flex justify-between">
              <div className="w-[40%]">단어</div>
              <div className="w-[40%]">뜻</div>
              <div className="w-[20%] text-right">학습완료</div>
            </div>
            <div className="flex flex-col divide-y">
              {words.map(({ id, word, meaning }) => (
                <WordList
                  id={id}
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

export default IncorrectWord;
