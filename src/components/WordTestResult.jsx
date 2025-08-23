import React from "react";
import TestResultList from "./TestResultList";
import { useState } from "react";

const WordTestResult = ({ dev, testWords }) => {
  const [favorites, setFavorites] = useState(
    testWords.filter((w) => w.isFavorite)
  );
  dev && console.log(testWords);
  //개발 모드 시 테스트 단어 출력
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">테스트 통과 🎉</h2>
        <h3 className="text-lg mb-8">수고하셨습니다!</h3>
        <div className="w-full max-w-2xl bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 flex justify-between">
            <div className="w-1/2">뜻</div>
            <div className="w-1/3">단어</div>
            <div className="w-1/4">오답 횟수</div>
            <div className="w-1/12"></div>
          </div>
          <div className="flex flex-col">
            {testWords.map((word) => (
              <TestResultList
                key={word.wordId || word.id || word.word}
                dev={dev}
                word={word}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordTestResult;
