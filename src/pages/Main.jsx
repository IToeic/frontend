import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import WordStudy from "./Word/WordStudy";
import WordTest from "./Word/WordTest";
import MyWord from "./My/MyWord";
import IncorrectWord from "./My/IncorrectWord";
import DashBoard from "./DashBoard";
import WordPackTest from "./Test/WordPackTest";
import virtualUser from "../mock/virtualUser";
import WordPackChoice from "./WordPackChoice";
import indexesWithWordPackChoice from "../constant/indexesWithWordPackChoice";
import Footer from "../layouts/Footer";
// import { wordServices } from "../services/wordServices";
// import useUserStore from "../stores/userStore";

const Main = ({
  activeTab,
  activeSubTab,
  setActiveTab,
  setActiveSubTab,
  setExpandedTab,
}) => {
  const [selectedWordPack, setSelectedWordPack] = useState(
    virtualUser[0].wordpackIng
  );
  const [showWordPackChoice, setShowWordPackChoice] = useState(false);

  const [wordPackProgress, setWordPackProgress] = useState(0);
  // 임시 연결 - userId 제거
  // const { userId } = useUserStore();

  const indexes = indexesWithWordPackChoice;

  const wordPackChoiceCheck = indexes.includes(activeTab);

  const emptyWordPack = wordPackChoiceCheck && selectedWordPack === 0;

  const dev = true; // 개발 모드 활성화
  // const navigate = useNavigate();

  // 임시 연결 - mock 데이터로 단어팩 진행도 설정 (개발 모드에서는 완료로 설정)
  useEffect(() => {
    setWordPackProgress(1); // 개발 모드에서는 완료로 설정
  }, [selectedWordPack]);

  // API 호출 부분 주석 처리
  // useEffect(() => {
  //   const fetchWordPackProgress = async () => {
  //     if (!userId || !selectedWordPack) {
  //       setWordPackProgress(0);
  //       return;
  //     }

  //     try {
  //       const progressData = await wordServices.getWordpackProgress(userId);
  //       const currentProgress = progressData?.find(
  //         (pack) => pack.wordpackId === selectedWordPack
  //       );

  //       if (currentProgress) {
  //         // 50/50이면 진행도 1로 설정 (완료로 간주)
  //         const progress =
  //           currentProgress.completeCount >= currentProgress.totalWords ? 1 : 0;
  //         setWordPackProgress(progress);
  //       } else {
  //         setWordPackProgress(0);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch wordpack progress:", error);
  //       setWordPackProgress(0);
  //     }
  //   };

  //   fetchWordPackProgress();
  // }, [userId, selectedWordPack]);

  useEffect(() => {
    // 워드팩이 선택되지 않았다면 return
    if (emptyWordPack) {
      return;
    }

    // 개발 모드에서는 진행도 체크 무시
    if (dev) {
      return;
    }

    if (activeTab === "Test" && wordPackProgress !== 1) {
      if (wordPackProgress >= 0) {
        alert("현재 진행 중인 단어팩을 모두 마쳐야 테스트가 진행됩니다.⚠️");
        setActiveTab("");
        setActiveSubTab("");
        setExpandedTab(null);
      }
    }
  }, [
    activeTab,
    selectedWordPack,
    emptyWordPack,
    wordPackProgress,
    dev,
    setActiveTab,
    setActiveSubTab,
    setExpandedTab,
  ]);

  const tabComponents = {
    Word: {
      WordStudy: (
        <WordStudy
          setActiveSubTab={setActiveSubTab}
          selectedWordPack={selectedWordPack}
        />
      ),
      WordTest: <WordTest selectedWordPack={selectedWordPack} />,
    },
    Test: {
      WordPackTest: <WordPackTest dev={dev} selectedWordPack={selectedWordPack} />,
    },
    My: {
      MyWord: <MyWord setActiveSubTab={setActiveSubTab} />,
      IncorrectWord: <IncorrectWord setActiveSubTab={setActiveSubTab} />,
    },
  };

  if (emptyWordPack || showWordPackChoice) {
    return (
      <div className="flex-1 p-4 sm:p-8 bg-white">
        <WordPackChoice
          seletedWordPack={selectedWordPack}
          setSelectedWordPack={setSelectedWordPack}
          onBack={() => setShowWordPackChoice(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-8 bg-white min-h-[calc(100vh-4rem)] sm:min-h-[747px]">
      <div className="min-h-[calc(100vh-9rem)] sm:min-h-[600px]">
        {tabComponents[activeTab]?.[activeSubTab] || (
          <DashBoard
            setActiveTab={setActiveTab}
            setActiveSubTab={setActiveSubTab}
            setExpandedTab={setExpandedTab}
            selectedWordPack={selectedWordPack}
            setSelectedWordPack={setSelectedWordPack}
            setShowWordPackChoice={setShowWordPackChoice}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
