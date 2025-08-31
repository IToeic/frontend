import React, { useState, useEffect } from "react";
import { wordServices } from "../services/wordServices";
import useUserStore from "../stores/userStore";

const WordPackChoice = ({ selectedWordPack, setSelectedWordPack, onBack }) => {
  const [wordPacks, setWordPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useUserStore();

  useEffect(() => {
    const fetchWordPacks = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const result = await wordServices.getWordpackProgress(userId);

        if (result && Array.isArray(result)) {
          setWordPacks(result);
        } else {
          console.warn("WordPack API response is not an array:", result);
          setWordPacks([]);
        }
      } catch (error) {
        console.error("Failed to fetch word packs:", error);
        const errorMessage =
          error.userMessage || "단어팩 목록을 불러오는데 실패했습니다.";
        setError(errorMessage);
        setWordPacks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWordPacks();
  }, [userId]);

  function handleSelect(id) {
    // eslint-disable-next-line no-restricted-globals
    const check = confirm("해당 단어팩으로 수정하시겠습니까?");
    if (check) {
      setSelectedWordPack(id);
      if (onBack) {
        onBack?.();
      }
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">단어팩 선택</h1>
          <p className="text-gray-600">학습할 단어팩을 선택해주세요</p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">단어팩 목록을 불러오는 중...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-600">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wordPacks.map((pack) => {
              // 진행률 계산
              const progress =
                pack.totalWords > 0
                  ? Math.round((pack.completeCount / pack.totalWords) * 100)
                  : 0;

              return (
                <div
                  key={pack.wordpackId}
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer ${
                    pack.wordpackId === selectedWordPack
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handleSelect(pack.wordpackId)}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {pack.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      총 {pack.totalWords}개 단어 중 {pack.completeCount}개 완료
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      학습 중
                    </span>
                    <span className="text-sm text-gray-500">
                      {pack.learningCount}개 학습 중
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    진행률: {progress}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordPackChoice;
