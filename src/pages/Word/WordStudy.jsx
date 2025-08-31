import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WordCard from "../../components/WordCard";
import useWordStore from "../../stores/wordStore";
import useUserStore from "../../stores/userStore";

const WordStudy = ({ setActiveSubTab, selectedWordPack }) => {
  const navigate = useNavigate();
  const { dailyWords: words, loading, error, fetchDailyWords } = useWordStore();
  const { userId } = useUserStore();

  useEffect(() => {
    // 로그인된 사용자이고 단어팩이 선택된 경우에만 API 호출
    if (userId && selectedWordPack) {
      fetchDailyWords(selectedWordPack).catch((error) => {
        const errorMessage =
          error.userMessage || "오늘의 단어를 불러오는데 실패했습니다.";
        alert(errorMessage);
        navigate("/");
      });
    } else if (!userId) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [userId, selectedWordPack, fetchDailyWords, navigate]);

  if (!userId) {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Today's Word
            </h1>
            <p className="text-gray-600">오늘의 단어를 학습하세요</p>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">로그인이 필요합니다.</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              로그인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Today's Word
            </h1>
            <p className="text-gray-600">오늘의 단어를 학습하세요</p>
          </div>
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Today's Word
          </h1>
          <p className="text-gray-600">오늘의 단어를 학습하세요</p>
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
