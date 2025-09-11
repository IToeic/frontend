const SubjectiveTest = ({
  currentWord,
  handleSubmit,
  userInput,
  setUserInput,
  inputFlag,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-8 sm:mb-20">
          <span className="text-sm sm:text-base text-gray-700 font-semibold">
            Q. 다음 뜻에 알맞은 단어는?
          </span>
        </div>
        <div className="mb-4 sm:mb-6 flex justify-center">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-14 text-center">
            {currentWord.meaning}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-3 sm:space-y-4 justify-center items-center"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border rounded px-3 sm:px-4 py-2 text-base sm:text-lg w-full max-w-sm mb-6 sm:mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="단어를 입력하세요"
            disabled={inputFlag}
            translate="no"
            lang="en"
          />
          <div className="flex space-x-2 w-full max-w-sm">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm sm:text-base"
              disabled={inputFlag}
            >
              채점
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectiveTest;
