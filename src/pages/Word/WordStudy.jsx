import { useState, useEffect } from "react";
import WordCard from "../../components/WordCard";
// import useWordStore from "../../stores/wordStore";
// import useUserStore from "../../stores/userStore";
import wordSample from "../../mock/wordSample"; // 임시 연결

const WordStudy = ({ setActiveSubTab, selectedWordPack }) => {
  // 임시 연결 - mock 데이터 사용
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 임시 연결 - mock 데이터로 단어 로드
    setLoading(true);
    setTimeout(() => {
      setWords(wordSample.slice(0, 5)); // 처음 5개 단어만 사용
      setLoading(false);
    }, 500);
  }, [selectedWordPack]);

  // API 호출 부분 주석 처리
  // const { dailyWords: words, loading, error, fetchDailyWords } = useWordStore();
  // const { userId } = useUserStore();

  // useEffect(() => {
  //   // 로그인된 사용자이고 단어팩이 선택된 경우에만 API 호출
  //   if (userId && selectedWordPack) {
  //     fetchDailyWords(selectedWordPack, userId).catch((error) => {
  //       const errorMessage =
  //         error.userMessage || "오늘의 단어를 불러오는데 실패했습니다.";
  //       alert(errorMessage);
  //       navigate("/");
  //     });
  //   } else if (!userId) {
  //     // 로그인되지 않은 경우 로그인 페이지로 이동
  //     alert("로그인이 필요합니다.");
  //     navigate("/login");
  //   }
  // }, [userId, selectedWordPack]);

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Today's Word
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              오늘의 단어를 학습하세요
            </p>
          </div>
          <div className="text-center text-sm sm:text-base">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Today's Word
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            오늘의 단어를 학습하세요
          </p>
        </div>
        <WordCard
          words={words}
          setActiveSubTab={setActiveSubTab}
          page="WordStudy"
        />
      </div>
    </div>
  );
};

export default WordStudy;
