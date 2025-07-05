import React from "react";
import WordStudy from "../pages/WordStudy";
import WordTest from "../pages/WordTest";
import MyWord from "../pages//MyWord";
import IncorrectWord from "../pages/IncorrectWord";
import Test from "../pages/Test";
import DashBoard from "../pages/DashBoard";

const Main = ({ activeTab, activeSubTab }) => {
  const tabComponents = {
    Word: {
      Study: <WordStudy />,
      Test: <WordTest />,
    },
    Test: {
      Test: <Test />,
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
