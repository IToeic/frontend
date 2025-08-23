import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import FavoriteToggle from "../components/FavoriteToggle";
import useUserStore from "../stores/userStore";
import { wordServices } from "../services/wordServices";

const WordCard = ({ words, setActiveSubTab, page }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlindMode, setIsBlindMode] = useState(false);
  const currentWord = words[currentIndex];

  const [favorites, setFavorites] = useState(words.filter((w) => w.isFavorite));
  const { userId } = useUserStore();
  const navigate = useNavigate();

  const len = words.length;

  // 이전 단어로 이동
  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // 다음 단어로 이동
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // 테스트 페이지로 이동
  const handlTodayTest = () => {
    setActiveSubTab("TodayTest");
  };

  //발음 재생
  const handlePlayPronunciation = async () => {
    try {
      const audioBlob = await wordServices.getTTSAudio(currentWord.word);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

      // 메모리 정리
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error("Failed to play pronunciation:", error);
      alert("발음을 재생할 수 없습니다.");
      navigate("/");
    }
  };
  return (
    <>
      {/* 단어 카드 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 select-none">
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

          <FavoriteToggle
            wordId={currentWord?.wordId}
            favorites={favorites}
            setFavorites={setFavorites}
            userId={userId}
          />
        </div>

        {/* 단어 내용 */}
        <div className="text-center mb-8 items-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {currentWord.word}
          </h2>

          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handlePlayPronunciation}
              className="flex items-center justify-center gap-1 px-2 py-1 text-sm rounded hover:bg-blue-100 text-gray-600"
            >
              <SpeakerWaveIcon className="w-6 h-6" />
            </button>
          </div>

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
            className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
              currentIndex === 0 ? "opacity-0 pointer-events-none" : ""
            }`}
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
            onClick={() => {
              if (currentIndex !== len - 1) {
                handleNext();
              } else if (page === "WordStudy") {
                handlTodayTest();
              }
            }}
            className={`flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
              page !== "WordStudy" && currentIndex === len - 1
                ? "opacity-0 pointer-events-none ml-[2%]"
                : ""
            }`}
          >
            <span>{currentIndex === len - 1 ? "테스트" : "다음"}</span>
            {currentIndex !== len - 1 && (
              <svg
                className="w-5 h-5 ml-2"
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
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default WordCard;
