import { useState, useEffect } from "react";
import MyPage from "./MyPage";
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

  const indexes = indexesWithWordPackChoice;

  const wordPackChoiceCheck = indexes.includes(activeTab);

  const emptyWordPack = wordPackChoiceCheck && selectedWordPack === 0;

  const dev = false;

  useEffect(() => {
    const wordPackProgress = dev ? 1 : 0; //getActualProgress();
    //DB에서 추후에 가져와야 함

    // 워드팩이 선택되지 않았다면 return
    if (emptyWordPack) {
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
    activeSubTab,
    selectedWordPack,
    setExpandedTab,
    emptyWordPack,
    setActiveTab,
    setActiveSubTab,
    dev,
  ]);

  const tabComponents = {
    Word: {
      Study: <WordStudy setActiveSubTab={setActiveSubTab} />,
      TodayTest: <WordTest />,
    },
    Test: {
      Test: <WordPackTest dev={dev} />,
    },
    My: {
      MyWord: <MyWord setActiveSubTab={setActiveSubTab} />,
      IncorrectWord: <IncorrectWord setActiveSubTab={setActiveSubTab} />,
    },
  };

  if (emptyWordPack) {
    return (
      <div className="flex-1 p-8 bg-white">
        <WordPackChoice
          seletedWordPack={selectedWordPack}
          setSelectedWordPack={setSelectedWordPack}
          onBack={() => {}}
        />
      </div>
    );
  }

  if (activeTab === "MyPage") {
    setActiveSubTab(null);
    setExpandedTab(null);
    return (
      <div className="flex-1 p-8 bg-white">
        <MyPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-white">
      {tabComponents[activeTab]?.[activeSubTab] || (
        <DashBoard
          setActiveTab={setActiveTab}
          setActiveSubTab={setActiveSubTab}
          setExpandedTab={setExpandedTab}
          selectedWordPack={selectedWordPack}
          setSelectedWordPack={setSelectedWordPack}
        />
      )}
      <Footer />
    </div>
  );
};

export default Main;
