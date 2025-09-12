const WordList = ({ id, word, meaning, checked, onToggle, deleteWord }) => {
  return (
    <div
      key={id}
      className="flex items-center px-2 sm:px-4 py-3 hover:bg-gray-50 select-none"
    >
      <div className="w-[10%] flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onToggle(id);
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <div className="w-[40%] sm:w-[40%] ml-2 sm:ml-14 text-gray-800 notranslate text-sm sm:text-base">
        {word}
      </div>
      <div className="w-[35%] sm:w-[35%] ml-2 sm:ml-8 text-gray-600 text-sm sm:text-base">
        {meaning}
      </div>
    </div>
  );
};

export default WordList;
