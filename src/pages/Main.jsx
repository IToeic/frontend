import { useState, useEffect } from "react";
import WordStudy from "./WordStudy";
import WordTest from "./WordTest";
import MyWord from "./MyWord";
import IncorrectWord from "./IncorrectWord";
import DashBoard from "./DashBoard";
import WordPackTest from "./WordPackTest";
import virtualUser from "../mock/virtualUser";
import WordPackChoice from "./WordPackChoice";
import indexesWithWordPackChoice from "../constant/indexesWithWordPackChoice";

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
    const wordPackProgress = dev || 0;
    //DB에서 추후에 가져와야 함

    // 워드팩이 선택되지 않았다면 return
    if (emptyWordPack) {
      return;
    }

    if (activeTab === "Test" && wordPackProgress !== 1) {
      if (wordPackProgress > 0) {
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
        <WordPackChoice setSelectedWordPack={setSelectedWordPack} />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-white">
      {tabComponents[activeTab]?.[activeSubTab] || <DashBoard />}
    </div>
  );
};

export default Main;
