import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import WordList from "../../components/WordList";
import WordCard from "../../components/WordCard";
// import { wordServices } from "../../services/wordServices";
// import useUserStore from "../../stores/userStore";
import wordSample from "../../mock/wordSample"; // 임시 연결

const MyWord = ({ setActiveSubTab }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doStudy, setDoStudy] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // 임시 연결 - mock 데이터 사용
  // const { userId } = useUserStore();
  // const navigate = useNavigate();

  useEffect(() => {
    // 임시 연결 - mock 데이터로 내 단어장 설정
    setLoading(true);
    setTimeout(() => {
      setWords(wordSample.slice(0, 10)); // 처음 10개 단어를 내 단어장으로 사용
      setLoading(false);
    }, 500);
  }, []);

  // API 호출 부분 주석 처리
  // useEffect(() => {
  //   const fetchMyWords = async () => {
  //     if (!userId) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const wordData = await wordServices.getMyWords(userId);
  //       setWords(wordData);
  //     } catch (error) {
  //       console.error("Failed to fetch my words:", error);
  //       alert("내 단어장을 불러오는데 실패했습니다.");
  //       navigate("/");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMyWords();
  // }, [userId]);

  const deleteWord = async (wordId) => {
    // 임시 연결 - 로컬에서만 삭제
    setWords(words.filter((w) => w.wordId !== wordId));

    // API 호출 부분 주석 처리
    // if (!userId) {
    //   alert("사용자 정보가 없습니다.");
    //   return;
    // }

    // try {
    //   await wordServices.removeFromMyWords(userId, wordId);
    //   setWords(words.filter((w) => w.wordId !== wordId));
    // } catch (error) {
    //   console.error("Failed to delete word:", error);
    //   alert("단어 삭제에 실패했습니다.");
    //   navigate("/");
    // }
  };

  const HandleStudyClick = () => {
    setDoStudy(!doStudy);
  };

  const handleSelectWord = (wordId) => {
    setSelectedWords((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedWords([]);
      setSelectAll(false);
    } else {
      setSelectedWords(words.map((word) => word.wordId));
      setSelectAll(true);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedWords.length === 0) {
      alert("삭제할 단어를 선택해주세요.");
      return;
    }

    if (
      !window.confirm(
        `선택된 ${selectedWords.length}개의 단어를 삭제하시겠습니까?`
      )
    ) {
      return;
    }

    // 임시 연결 - 로컬에서만 삭제
    setWords(words.filter((word) => !selectedWords.includes(word.wordId)));
    setSelectedWords([]);
    setSelectAll(false);
    alert("선택된 단어가 삭제되었습니다.");

    // API 호출 부분 주석 처리
    // try {
    //   // API 호출 - 선택된 단어들의 wordId 리스트 전달
    //   await wordServices.deleteMyWords(userId, selectedWords);

    //   // 성공적으로 삭제된 단어들을 목록에서 제거
    //   setWords(words.filter((word) => !selectedWords.includes(word.wordId)));
    //   setSelectedWords([]);
    //   setSelectAll(false);

    //   alert("선택된 단어가 삭제되었습니다.");
    // } catch (error) {
    //   console.error("Failed to delete selected words:", error);
    //   alert("단어 삭제에 실패했습니다.");
    // }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              My Words
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">내 단어장</p>
          </div>
          <div className="text-center text-sm sm:text-base">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            My Words
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">내 단어장</p>
        </div>
        <div
          className={`w-full ${
            doStudy ? "" : "ml-0 sm:ml-[10%] max-w-2xl"
          } flex justify-end align-right gap-2`}
        >
          {!doStudy && (
            <button
              onClick={handleDeleteSelected}
              disabled={selectedWords.length === 0}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mb-2"
            >
              삭제
            </button>
          )}
          <button
            onClick={HandleStudyClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mb-2"
          >
            {doStudy ? "학습끝내기" : "학습하기"}
          </button>
        </div>

        {doStudy ? (
          <WordCard
            words={words}
            setActiveSubTab={setActiveSubTab}
            page="MyWord"
          />
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow ml-0 sm:ml-[10%]">
            <div className="bg-gray-100 px-2 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-gray-700 flex justify-between">
              <div className="w-[10%] flex-shrink-0">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="w-[35%] sm:w-[35%] ml-2 sm:ml-0">단어</div>
              <div className="w-[35%] sm:w-[35%] ml-2 sm:ml-0">뜻</div>
            </div>
            <div className="flex flex-col divide-y">
              {words.map(({ wordId, word, meaning }) => (
                <WordList
                  key={wordId}
                  id={wordId}
                  word={word}
                  meaning={meaning}
                  deleteWord={deleteWord}
                  isSelected={selectedWords.includes(wordId)}
                  onSelect={handleSelectWord}
                />
              ))}
              {words.length === 0 && (
                <div className="px-4 py-6 text-center text-gray-500">
                  단어가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWord;
