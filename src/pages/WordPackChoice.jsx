import React, { useState, useEffect } from "react";
// import { wordServices } from "../services/wordServices";
// import useUserStore from "../stores/userStore";

const WordPackChoice = ({ selectedWordPack, setSelectedWordPack, onBack }) => {
  const [wordPacks, setWordPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // 임시 연결 - mock 데이터 사용
  // const { userId } = useUserStore();

  useEffect(() => {
    // 임시 연결 - mock 데이터로 단어팩 목록 설정
    setLoading(true);
    setTimeout(() => {
      const mockWordPacks = [
        {
          wordpackId: 1,
          name: "토익 기본 단어",
          totalWords: 50,
          completeCount: 0,
          learningCount: 0,
        },
        {
          wordpackId: 2,
          name: "토익 중급 단어",
          totalWords: 50,
          completeCount: 15,
          learningCount: 5,
        },
        {
          wordpackId: 3,
          name: "토익 고급 단어",
          totalWords: 50,
          completeCount: 30,
          learningCount: 3,
        },
        {
          wordpackId: 4,
          name: "비즈니스 영어",
          totalWords: 50,
          completeCount: 50,
          learningCount: 0,
        },
        {
          wordpackId: 5,
          name: "일상 회화",
          totalWords: 50,
          completeCount: 25,
          learningCount: 8,
        },
        {
          wordpackId: 6,
          name: "시험 필수 단어",
          totalWords: 50,
          completeCount: 10,
          learningCount: 2,
        },
      ];
      setWordPacks(mockWordPacks);
      setLoading(false);
    }, 500);
  }, []);

  // API 호출 부분 주석 처리
  // useEffect(() => {
  //   const fetchWordPacks = async () => {
  //     if (!userId) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const result = await wordServices.getWordpackProgress(userId);

  //       if (result && Array.isArray(result)) {
  //         setWordPacks(result);
  //       } else {
  //         console.warn("WordPack API response is not an array:", result);
  //         setWordPacks([]);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch word packs:", error);
  //       const errorMessage =
  //         error.userMessage || "단어팩 목록을 불러오는데 실패했습니다.";
  //       setError(errorMessage);
  //       setWordPacks([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWordPacks();
  // }, [userId]);

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            단어팩 선택
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            학습할 단어팩을 선택해주세요
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">단어팩 목록을 불러오는 중...</div>
          </div>
        ) : (
          // ) : error ? (
          //   <div className="text-center py-8">
          //     <div className="text-red-600">{error}</div>
          //   </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wordPacks.map((pack) => {
              // 진행률 계산
              const progress =
                pack.totalWords > 0
                  ? Math.round((pack.completeCount / pack.totalWords) * 100)
                  : 0;

              return (
                <div
                  key={pack.wordpackId}
                  className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow cursor-pointer ${
                    pack.wordpackId === selectedWordPack
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handleSelect(pack.wordpackId)}
                >
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {pack.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      총 {pack.totalWords}개 단어 중 {pack.completeCount}개 완료
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      학습 중
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
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
