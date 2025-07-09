const AnswerFeedback = ({ isCorrect }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div
        className={`px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-md transition-opacity duration-300 ${
          isCorrect ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다!"}
      </div>
    </div>
  );
};

export default AnswerFeedback;
