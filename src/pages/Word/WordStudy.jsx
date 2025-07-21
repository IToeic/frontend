import wordSample from "../../mock/wordSample";

import WordCard from "../../components/WordCard";

const WordStudy = ({ setActiveSubTab }) => {
  const words = wordSample;
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
