import React from "react";
import WordStudy from "./WordStudy";
import WordTest from "./WordTest";
import MyWord from "./MyWord";
import IncorrectWord from "./IncorrectWord";
import DashBoard from "./DashBoard";
import WordPackTest from "./WordPackTest";

const Main = ({ activeTab, activeSubTab, setActiveTab, setActiveSubTab }) => {
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

  return (
    <div className="flex-1 p-8 bg-white">
      {tabComponents[activeTab]?.[activeSubTab] || <DashBoard />}
    </div>
  );
};

export default Main;
