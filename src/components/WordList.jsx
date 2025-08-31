const WordList = ({ id, word, meaning, deleteWord, isSelected, onSelect }) => {
  return (
    <div
      key={id}
      className="flex items-center px-4 py-3 hover:bg-gray-50 select-none"
    >
      {onSelect && (
        <div className="w-[10%]">
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={onSelect}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      )}
      <div
        className={`${onSelect ? "w-[40%]" : "w-[40%]"} ml-14 text-gray-800`}
      >
        {word}
      </div>
      <div className={`${onSelect ? "w-[35%]" : "w-[35%]"} ml-8 text-gray-600`}>
        {meaning}
      </div>
    </div>
  );
};

export default WordList;
