import MultipleChoiceList from "./MultipleChoiceList";
import AnswerFeedback from "./AnswerFeedback";

const MultipleChoiceTest = ({
  currentWord,
  handleSubmit,
  inputFlag,
  showFeedback,
  isCorrect,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-xl relative">
        {showFeedback && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <AnswerFeedback isCorrect={isCorrect} />
          </div>
        )}
        <div className="flex justify-between items-center mb-8 sm:mb-20">
          <span className="text-sm sm:text-base text-gray-700 font-semibold">
            Q{currentWord.id}. 다음 단어에 알맞은 뜻은?
          </span>
        </div>
        <div className="mb-4 sm:mb-6 flex justify-center">
          <h2
            className="text-xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-14 notranslate"
            translate="no"
            lang="en"
          >
            {currentWord.word}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-3 sm:space-y-4 justify-center items-center"
        >
          <MultipleChoiceList
            currentWord={currentWord}
            handleSubmit={handleSubmit}
            inputFlag={inputFlag}
          />
        </form>
      </div>
    </div>
  );
};

export default MultipleChoiceTest;
