import { useState } from "react";
import ProgressDoughnut from "../components/ProgressDoughnut";
import quotes from "../mock/quotes";
import WordPackChoice from "./WordPackChoice";

const DashBoard = ({
  setActiveTab,
  setActiveSubTab,
  setExpandedTab,
  selectedWordPack,
  setSelectedWordPack,
}) => {
  let [goWordPackChoice, setGoWordPackChoice] = useState(false);
  const randomNum = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomNum];

  function handleGoWordStudy() {
    setActiveTab("Word");
    setActiveSubTab("Study");
    setExpandedTab("Word");
  }

  function handleGoWordPackChoice() {
    setGoWordPackChoice(true);
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
      <div className="flex-1 bg-white p-10">
        {/* 타이틀 */}
        <h1 className="text-4xl font-bold mb-6">DashBoard</h1>

        {/* 진행중인 단어팩 */}
        <div className="mb-4 text-lg">
          <span role="img" aria-label="folder">
            📁
          </span>
          진행중인 단어팩: <span className="font-semibold">초급 어쩌구</span>
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
                <ProgressDoughnut />
                <p className="font-semibold text-sm mt-2">4 / 5</p>
              </div>
            </div>

            {/* 오른쪽 텍스트 */}
            <div className="flex-1 space-y-1 text-sm ml-10">
              <p>
                📌 오늘 배운 단어: <span className="font-semibold">4개</span>
              </p>
              <p>
                ❌ 틀린 단어: <span className="font-semibold">1개</span>
              </p>
              <p>
                🔵 다음 단어 <span className="font-semibold">1개</span>{" "}
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
          <div className="bg-gray-200 w-40 h-40 flex items-center justify-center text-center text-gray-700 shadow-sm">
            인공이..?
          </div>
          <div className="bg-gray-100 rounded-xl px-6 py-8 text-center text-lg shadow">
            {quote.text}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
