import React from "react";
import wordPackChoice from "../mock/wordPackChoice";

const WordPackChoice = ({ selectedWordPack, setSelectedWordPack, onBack }) => {
  function handleSelect(id) {
    // eslint-disable-next-line no-restricted-globals
    const check = confirm("해당 단어팩으로 수정하시겠습니까?");
    if (check) {
      setSelectedWordPack(id);
      if (onBack) {
        onBack?.();
      }
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">단어팩 선택</h1>
          <p className="text-gray-600">학습할 단어팩을 선택해주세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wordPackChoice.map((pack) => (
            <div
              key={pack.id}
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer ${
                pack.id === selectedWordPack ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleSelect(pack.id)}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {pack.title}
                </h3>
                <p className="text-gray-600 text-sm">{pack.description}</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pack.difficulty === "초급"
                      ? "bg-green-100 text-green-800"
                      : pack.difficulty === "중급"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pack.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  {pack.wordCount}개 단어
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pack.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                진행률: {pack.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordPackChoice;
