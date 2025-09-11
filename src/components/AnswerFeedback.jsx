const AnswerFeedback = ({ isCorrect }) => {
  return (
    <div
      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white text-sm sm:text-lg font-semibold shadow-md transition-opacity duration-300 ${
        isCorrect ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다!"}
    </div>
  );
};

export default AnswerFeedback;
