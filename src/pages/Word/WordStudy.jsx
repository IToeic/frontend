import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WordCard from "../../components/WordCard";
import { wordServices } from "../../services/wordServices";
import useUserStore from "../../stores/userStore";

const WordStudy = ({ setActiveSubTab, selectedWordPack }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const wordData = await wordServices.getDailyWords(selectedWordPack);
        setWords(wordData);
      } catch (error) {
        console.error("Failed to fetch words:", error);
        alert("오늘의 단어를 불러오는데 실패했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (selectedWordPack) {
      fetchWords();
    }
  }, [selectedWordPack]);

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Today's Word
            </h1>
            <p className="text-gray-600">오늘의 단어를 학습하세요</p>
          </div>
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Today's Word
          </h1>
          <p className="text-gray-600">오늘의 단어를 학습하세요</p>
        </div>
        <WordCard
          words={words}
          setActiveSubTab={setActiveSubTab}
          page="WordStudy"
        />
      </div>
    </div>
  );
};

export default WordStudy;
