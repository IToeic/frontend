const WordList = ({ id, word, meaning, deleteWord }) => {
  return (
    <div
      key={id}
      className="flex items-center px-4 py-3 hover:bg-gray-50 select-none"
    >
      <div className="w-[40%] text-gray-800">{word}</div>
      <div className="w-[40%] text-gray-600">{meaning}</div>
      <div className="w-[20%] text-right">
        <button
          onClick={() => deleteWord(id)}
          className="text-red-500 hover:text-red-700 transition duration-150"
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default WordList;
