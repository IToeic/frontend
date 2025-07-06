import React, { useState } from "react";
import deactiveStar from "../assets/images/Freepik(DeactiveStar)-Flaticon.png";
import activeStar from "../assets/images/PixelPerfect(ActiveStar)-Flaticon.png";
import wordSample from "../constant/wordSample";

const WordStudy = () => {
  // 단어 임시 샘플 데이터(백엔드에서 연결 필요)
  const words = wordSample;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlindMode, setIsBlindMode] = useState(false);
  const [favorites, setFavorites] = useState([2, 4]); // 즐겨찾기된 단어 ID들

  const currentWord = words[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : words.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0));
  };

  const toggleFavorite = (wordId) => {
    setFavorites((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId]
    );
  };

  const isFavorite = favorites.includes(currentWord.id);

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Words</h1>
          <p className="text-gray-600">오늘의 단어를 학습하세요</p>
        </div>

        {/* 단어 카드 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* 상단 컨트롤 */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBlindMode}
                  onChange={(e) => setIsBlindMode(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Blind Meaning
                </span>
              </label>
            </div>

            {/* 즐겨찾기 버튼 */}
            <button
              onClick={() => toggleFavorite(currentWord.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <img
                src={isFavorite ? activeStar : deactiveStar}
                alt="favorite"
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* 단어 내용 */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {currentWord.word}
            </h2>

            {!isBlindMode && (
              <div className="space-y-4">
                <p className="text-xl text-gray-600">{currentWord.meaning}</p>
              </div>
            )}

            {isBlindMode && (
              <div className="space-y-4">
                <div className="h-7 bg-gray-200 rounded animate-pulse"></div>
              </div>
            )}
          </div>

          {/* 네비게이션 */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>이전</span>
            </button>

            <div className="text-sm text-gray-500">
              {currentIndex + 1} / {words.length}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <span>다음</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 진행률 표시 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              학습 진행률
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentIndex + 1) / words.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordStudy;
