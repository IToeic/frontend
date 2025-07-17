import WordList from "../components/wordList";

const MyWord = () => {
  return (
    <div className="relative bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Words</h1>
        <p className="text-gray-600">내 단어장</p>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 flex justify-between">
          <div className="w-[10%]">✔️</div>
          <div className="w-[45%]">단어</div>
          <div className="w-[45%]">뜻</div>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};

export default MyWord;
