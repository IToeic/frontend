import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import ProgressDoughnut from "../components/ProgressDoughnut";
import quotes from "../mock/quotes";
// import WordPackChoice from "./WordPackChoice";
// import { wordServices } from "../services/wordServices";
// import useUserStore from "../stores/userStore";

const DashBoard = ({
  setActiveTab,
  setActiveSubTab,
  setExpandedTab,
  selectedWordPack,
  setSelectedWordPack,
  setShowWordPackChoice,
}) => {
  // 임시 연결 - mock 데이터 사용
  const [progressData, setProgressData] = useState(null);
  const [myWordsCount, setMyWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [todayWordsCount, setTodayWordsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const randomNum = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomNum];

  // 임시 연결 - mock 데이터 사용
  // const { userId } = useUserStore();
  // const navigate = useNavigate();

  useEffect(() => {
    // 임시 연결 - mock 데이터로 대시보드 데이터 설정
    setLoading(true);
    setTimeout(() => {
      const mockProgressData = [
        {
          wordpackId: selectedWordPack,
          name: "토익 기본 단어",
          totalWords: 50,
          completeCount: 15,
          learningCount: 5,
        },
      ];

      setProgressData(mockProgressData);
      setMyWordsCount(10); // MyWord에서 설정한 mock 데이터 개수
      setIncorrectWordsCount(3); // IncorrectWord에서 설정한 mock 데이터 개수
      setTodayWordsCount(5); // WordStudy에서 설정한 mock 데이터 개수
      setLoading(false);
    }, 500);
  }, [selectedWordPack]);

  // API 호출 부분 주석 처리
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     if (!userId) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       // 각 API 호출을 개별적으로 처리하여 일부 실패해도 다른 데이터는 표시
  //       let progress = null;
  //       let myWords = [];
  //       let incorrectWords = [];

  //       try {
  //         progress = await wordServices.getWordpackProgress(userId);
  //       } catch (error) {
  //         console.error("Failed to fetch progress:", error);
  //       }

  //       try {
  //         myWords = await wordServices.getMyWords(userId);
  //       } catch (error) {
  //         console.error("Failed to fetch my words:", error);
  //       }

  //       try {
  //         incorrectWords = await wordServices.getIncorrectWords();
  //       } catch (error) {
  //         console.error("Failed to fetch incorrect words:", error);
  //       }

  //       setProgressData(progress);
  //       setMyWordsCount(myWords.length || 0);
  //       setIncorrectWordsCount(incorrectWords.length || 0);

  //       // 현재 선택된 단어팩의 오늘 단어 개수 가져오기
  //       if (selectedWordPack) {
  //         try {
  //           const todayWords = await wordServices.getDailyWords(
  //             selectedWordPack,
  //             userId
  //           );
  //           setTodayWordsCount(todayWords.length);
  //         } catch (error) {
  //           console.error("Failed to fetch today words:", error);
  //           setTodayWordsCount(0);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch dashboard data:", error);
  //       // 전체 실패 시에도 기본값으로 설정
  //       setProgressData(null);
  //       setMyWordsCount(0);
  //       setIncorrectWordsCount(0);
  //       setTodayWordsCount(0);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, [userId, selectedWordPack]);

  function handleGoWordStudy() {
    setActiveTab("Word");
    setActiveSubTab("Study");
    setExpandedTab("Word");
  }

  function handleGoWordPackChoice() {
    setShowWordPackChoice(true);
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
    <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">오늘의 학습 현황을 확인해보세요</p>
      </div>

      {/* 진행중인 단어팩 카드 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        {/* --- 넓은 화면용 레이아웃 (sm 사이즈 이상에서만 보임) --- */}
        <div className="hidden sm:flex items-center justify-between">
          {/* 좌측 (아이콘 + 텍스트) */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">📚</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 break-keep">
                진행중인 단어팩
              </h3>
              <p className="text-gray-600 break-keep">
                {currentProgress?.name || "선택되지 않음"}
              </p>
            </div>
          </div>

          {/* 우측 (기존 버튼) */}
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform whitespace-nowrap"
            onClick={handleGoWordPackChoice}
          >
            변경하기
          </button>
        </div>

        {/* --- 좁은 화면용 레이아웃 (sm 사이즈 미만에서만 보임) --- */}
        <div className="block sm:hidden">
          {/* 상단 (텍스트만) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 break-keep">
              진행중인 단어팩
            </h3>
            <p className="text-gray-600 break-keep">
              {currentProgress?.name || "선택되지 않음"}
            </p>
          </div>

          {/* 하단 (아이콘 + 텍스트 합쳐진 새 버튼) */}
          <button
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            onClick={handleGoWordPackChoice}
          >
            <span className="text-xl">📚</span>
            <span>변경하기</span>
          </button>
        </div>
      </div>

      {/* 오늘의 진행상황 카드 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 break-keep">오늘의 진행상황</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 진행률 차트 */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <ProgressDoughnut
                completeCount={currentProgress?.completeCount || 0}
                totalWords={currentProgress?.totalWords || 0}
              />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {currentProgress?.completeCount || 0} /{" "}
              {currentProgress?.totalWords || 0}
            </p>
            <p className="text-gray-600 text-sm">완료된 단어</p>
          </div>

          {/* 학습 통계 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📖</span>
                </div>
                <span className="text-gray-700">오늘 배운 단어</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {currentProgress?.learningCount || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">❌</span>
                </div>
                <span className="text-gray-700">틀린 단어</span>
              </div>
              <span className="text-2xl font-bold text-red-600">
                {incorrectWordsCount}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <span className="text-gray-700">남은 단어</span>
              </div>
              <span className="text-2xl font-bold text-emerald-600">
                {currentProgress?.totalWords - currentProgress?.completeCount ||
                  0}
              </span>
            </div>
          </div>

          {/* 학습 바로가기 */}
          <div className="flex flex-col justify-center">
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform text-lg font-semibold whitespace-nowrap" // <-- 이 부분을 추가해주세요
              onClick={handleGoWordStudy}
            >
              🚀 학습 시작하기
            </button>
          </div>
        </div>
      </div>

      {/* 통계 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* 내 단어장 카드 */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform ">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">내 단어장</p>
              <p className="text-3xl font-bold">{myWordsCount}</p>
            </div>
          </div>
        </div>

        {/* 오늘의 단어 카드 */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform  ">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm whitespace-nowrap">오늘의 단어</p>
              <p className="text-3xl font-bold">{todayWordsCount}</p>
            </div>
          </div>
        </div>

        {/* 틀린 단어 카드 */}
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform  ">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
            <div className="text-right">
              <p className="text-red-100 text-sm ">틀린 단어</p>
              <p className="text-3xl font-bold">{incorrectWordsCount}</p>
            </div>
          </div>
        </div>

        {/* 학습 완료율 카드 */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform  ">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">완료율</p>
              <p className="text-3xl font-bold">
                {currentProgress?.totalWords > 0
                  ? Math.round(
                      (currentProgress?.completeCount /
                        currentProgress?.totalWords) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 명언 카드 */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">💭</span>
          </div>
          <p className="text-xl text-gray-700 italic leading-relaxed">
            "{quote.text}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
