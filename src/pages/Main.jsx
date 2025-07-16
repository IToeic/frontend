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

const Main = ({ activeTab, activeSubTab, setActiveTab, setActiveSubTab }) => {
  const [selectedWordPack, setSelectedWordPack] = useState(
    virtualUser[0].wordpackIng
  );

  const indexes = indexesWithWordPackChoice;

  const wordPackChoiceCheck = indexes.includes(activeTab);

  useEffect(() => {
    const wordPackProgress = 0.4;
    if (activeTab === "Test" && wordPackProgress !== 1) {
      if (wordPackProgress > 0) {
        alert("현재 진행 중인 단어팩을 모두 마쳐야 테스트가 진행됩니다.⚠️");
        setActiveTab("");
        setActiveSubTab("");
      }
    }
  }, [activeTab, activeSubTab]);

  const tabComponents = {
    Word: {
      Study: <WordStudy setActiveSubTab={setActiveSubTab} />,
      TodayTest: <WordTest />,
    },
    Test: {
      Test: <WordPackTest />,
    },
    My: {
      MyWord: <MyWord />,
      IncorrectWord: <IncorrectWord />,
    },
  };

  //지금 워드팩 선택에 상관없이 테스트 탭을 누르면 먼저 진행률을 확인함
  //워드팩이 선택되어있는지를 판단한 후 , 진행률을 판단해야 함
  //워드 팩 선택 조건의 플래그 변수를 따로 둬서 return 안에서 처리해야 할 듯

  if (wordPackChoiceCheck && selectedWordPack === 0) {
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
