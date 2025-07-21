import { useState, useEffect } from "react";
import wordPackSample from "../mock/wordPackSample";

const MultipleChoiceList = ({ currentWord, handleSubmit, inputFlag }) => {
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // 4지선다 옵션 생성
  useEffect(() => {
    if (currentWord) {
      const correctAnswer = currentWord.meaning;

      // 정답이 아닌 다른 단어들에서 3개 랜덤 선택
      const otherWords = wordPackSample.filter(
        (word) => word.meaning !== correctAnswer
      );
      const shuffledOthers = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // 4개 옵션 생성 (정답 + 3개 오답)
      const allOptions = [
        correctAnswer,
        ...shuffledOthers.map((word) => word.meaning),
      ];

      // 옵션 순서 랜덤화
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

      setOptions(shuffledOptions);
      setSelectedAnswer("");
    }
  }, [currentWord]);

  const handleSubmitClick = (selectedAnswer) => {
    if (!selectedAnswer) return;

    // 정답 여부 확인
    const isCorrect =
      selectedAnswer.toLowerCase() === currentWord.meaning.toLowerCase();

    // handleSubmit 호출 (부모 컴포넌트에서 처리)
    const mockEvent = { preventDefault: () => {} };
    handleSubmit(mockEvent, selectedAnswer, isCorrect);
  };

  return (
    <div className="w-full space-y-4">
      {/* 4지선다 버튼들 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            value={option}
            onClick={(e) => handleSubmitClick(e.target.value)}
            disabled={inputFlag}
            className={`p-4 text-lg font-medium rounded-lg border-2 transition-all ${
              selectedAnswer === option
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            } ${
              inputFlag ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceList;
