import React from "react";
import TestResultList from "./TestResultList";
import { useState } from "react";

const WordTestResult = ({ dev, testWords }) => {
  const [favorites, setFavorites] = useState(
    testWords.filter((w) => w.isFavorite || w.favorite)
  );
  dev && console.log(testWords);
  //개발 모드 시 테스트 단어 출력
  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
            테스트 통과 ✨
          </h1>
          <p className="text-gray-600 text-sm sm:text-base text-center">
            수고하셨습니다!
          </p>
        </div>
        <div className="w-full bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-gray-700 text-left">
                  뜻
                </th>
                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-gray-700 text-left">
                  단어
                </th>
                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-gray-700 text-center">
                  오답
                </th>
                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-gray-700 text-center min-w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {testWords.map((word) => (
                <TestResultList
                  key={word.wordId || word.id || word.word}
                  dev={dev}
                  word={word}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WordTestResult;
