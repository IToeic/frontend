import { useState } from "react";
import WordList from "../components/WordList";
import myWordSample from "../mock/myWordSample";
import WordCard from "../components/WordCard";

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

  return (
    <div className="relative bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Incorrect Words
        </h1>
        <p className="text-gray-600">틀린 단어장</p>
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
