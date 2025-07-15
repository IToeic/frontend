import MultipleChoiceList from "./MultipleChoiceList";

const MultipleChoiceTest = ({
  setUserInput,
  currentWord,
  handleSubmit,
  inputFlag,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-20">
          <span className="text-gray-700 font-semibold">
            Q{currentWord.id}. 다음 단어에 알맞은 뜻은?
          </span>
        </div>
        <div className="mb-6 flex justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-14">
            {currentWord.word}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 justify-center items-center"
        >
          <MultipleChoiceList
            currentWord={currentWord}
            handleSubmit={handleSubmit}
            setUserInput={setUserInput}
            inputFlag={inputFlag}
          />
        </form>
      </div>
    </div>
  );
};

export default MultipleChoiceTest;
