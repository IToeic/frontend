const SubjectiveTest = ({
  currentWord,
  handleSubmit,
  userInput,
  setUserInput,
  inputFlag,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-20">
          <span className="text-gray-700 font-semibold">
            Q. 다음 뜻에 알맞은 단어는?
          </span>
        </div>
        <div className="mb-6 flex justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-14">
            {currentWord.meaning}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 justify-center items-center"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border rounded px-4 py-2 text-lg w-[80%] mb-10"
            placeholder="단어를 입력하세요"
            disabled={inputFlag}
          />
          <div className="flex space-x-2 w-[80%]">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
