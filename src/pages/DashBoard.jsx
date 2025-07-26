const DashBoard = () => {
  return (
    <div className="flex-1 bg-white p-10">
      {/* 타이틀 */}
      <h1 className="text-4xl font-bold mb-6">DashBoard</h1>

      {/* 진행중인 단어팩 */}
      <div className="mb-4 text-lg">
        <span role="img" aria-label="folder">
          📁
        </span>{" "}
        진행중인 단어팩: <span className="font-semibold">초급 어쩌구</span>
      </div>

      {/* 오늘의 진행상황 */}
      <div className="mb-6 text-gray-800">
        <p className="mb-2">✔ 오늘의 진행상황:</p>

        <div className="bg-blue-100 p-6 rounded shadow-md flex items-center gap-6">
          {/* 왼쪽 원형 차트 & 숫자 */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 mx-auto mb-2"></div>
            <p className="font-semibold text-sm">4 / 5</p>
          </div>

          {/* 오른쪽 텍스트 */}
          <div className="flex-1 space-y-1 text-sm">
            <p>
              📌 오늘 배운 단어: <span className="font-semibold">4개</span>
            </p>
            <p>
              ❌ 틀린 단어: <span className="font-semibold">1개</span>
            </p>
            <p>
              🔵 다음 단어 <span className="font-semibold">1개</span> 남았어요!
            </p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
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
          “ 조금만 더 해봐요! ”
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
