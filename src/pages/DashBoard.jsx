import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressDoughnut from "../components/ProgressDoughnut";
import quotes from "../mock/quotes";
import WordPackChoice from "./WordPackChoice";
import { wordServices } from "../services/wordServices";
import useUserStore from "../stores/userStore";

const DashBoard = ({
  setActiveTab,
  setActiveSubTab,
  setExpandedTab,
  selectedWordPack,
  setSelectedWordPack,
}) => {
  let [goWordPackChoice, setGoWordPackChoice] = useState(false);
  const [progressData, setProgressData] = useState(null);
  const [myWordsCount, setMyWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [todayWordsCount, setTodayWordsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const randomNum = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomNum];
  const { userId } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // 병렬로 여러 API 호출
        const [progress, myWords, incorrectWords] = await Promise.all([
          wordServices.getWordpackProgress(userId),
          wordServices.getMyWords(userId),
          wordServices.getIncorrectWords(userId),
        ]);

        setProgressData(progress);
        setMyWordsCount(myWords.length);
        setIncorrectWordsCount(incorrectWords.length);

        // 현재 선택된 단어팩의 오늘 단어 개수 가져오기
        if (selectedWordPack) {
          try {
            const todayWords = await wordServices.getDailyWords(
              selectedWordPack
            );
            setTodayWordsCount(todayWords.length);
          } catch (error) {
            console.error("Failed to fetch today words:", error);
            setTodayWordsCount(0);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        alert("대시보드 데이터를 불러오는데 실패했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId, selectedWordPack]);

  function handleGoWordStudy() {
    setActiveTab("Word");
    setActiveSubTab("Study");
    setExpandedTab("Word");
  }

  function handleGoWordPackChoice() {
    setGoWordPackChoice(true);
  }

  // 현재 선택된 단어팩의 진행도 찾기
  const currentProgress = progressData?.find(
    (pack) => pack.wordpackId === selectedWordPack
  );

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-4xl font-bold mb-6">DashBoard</h1>
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      {goWordPackChoice && (
        <WordPackChoice
          selectedWordPack={selectedWordPack}
          setSelectedWordPack={setSelectedWordPack}
          onBack={() => setGoWordPackChoice(false)}
        />
      )}
      <div className="flex-1 p-8 bg-white">
        {/* 타이틀 */}
        <h1 className="text-4xl font-bold mb-6">DashBoard</h1>

        {/* 진행중인 단어팩 */}
        <div className="mb-4 text-lg">
          <span role="img" aria-label="folder">
            📁
          </span>
          진행중인 단어팩:{" "}
          <span className="font-semibold">
            {currentProgress?.name || "선택되지 않음"}
          </span>
          <button
            className="bg-blue-600 text-white px-2 py-1 ml-3 rounded hover:bg-blue-700 text-sm"
            onClick={handleGoWordPackChoice}
          >
            변경
          </button>
        </div>

        {/* 오늘의 진행상황 */}
        <div className="mb-6 text-gray-800">
          <p className="mb-2">✔ 오늘의 진행상황:</p>

          <div className="bg-blue-100 p-6 rounded shadow-md flex items-center gap-6">
            {/* 왼쪽 원형 차트 & 숫자 */}
            <div className="text-center">
              <div className="text-center">
                <ProgressDoughnut
                  completeCount={currentProgress?.completeCount || 0}
                  totalWords={currentProgress?.totalWords || 0}
                />
                <p className="font-semibold text-sm mt-2">
                  {currentProgress?.completeCount || 0} /{" "}
                  {currentProgress?.totalWords || 0}
                </p>
              </div>
            </div>

            {/* 오른쪽 텍스트 */}
            <div className="flex-1 space-y-1 text-sm ml-10">
              <p>
                📌 오늘 배운 단어:{" "}
                <span className="font-semibold">
                  {currentProgress?.learningCount || 0}개
                </span>
              </p>
              <p>
                ❌ 틀린 단어:{" "}
                <span className="font-semibold">{incorrectWordsCount}개</span>
              </p>
              <p>
                🔵 다음 단어{" "}
                <span className="font-semibold">
                  {currentProgress?.totalWords -
                    currentProgress?.completeCount || 0}
                  개
                </span>{" "}
                남았어요!
              </p>
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                onClick={handleGoWordStudy}
              >
                👉 학습 바로가기
              </button>
            </div>
          </div>
        </div>

        {/* 하단 카드 영역 */}
        <div className="flex gap-6 mt-10">
          {/* 내 단어장 카드 */}
          <div className="bg-blue-50 w-40 h-40 flex flex-col items-center justify-center text-center text-blue-700 shadow-sm rounded-lg border border-blue-200">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold">{myWordsCount}</div>
            <div className="text-sm">내 단어장</div>
          </div>

          {/* 오늘의 단어 카드 */}
          <div className="bg-green-50 w-40 h-40 flex flex-col items-center justify-center text-center text-green-700 shadow-sm rounded-lg border border-green-200">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold">{todayWordsCount}</div>
            <div className="text-sm">오늘의 단어</div>
          </div>

          {/* 틀린 단어 카드 */}
          <div className="bg-red-50 w-40 h-40 flex flex-col items-center justify-center text-center text-red-700 shadow-sm rounded-lg border border-red-200">
            <div className="text-3xl mb-2">❌</div>
            <div className="text-2xl font-bold">{incorrectWordsCount}</div>
            <div className="text-sm">틀린 단어</div>
          </div>

          {/* 명언 카드 */}
          <div className="bg-gray-100 rounded-xl px-6 py-8 text-center text-lg shadow flex-1">
            {quote.text}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
