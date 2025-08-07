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
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [myPageAllowed, setMyPageAllowed] = useState(false);

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

  // 마이페이지 진입 시 비밀번호 확인
  useEffect(() => {
    if (activeTab === "MyPage" && !myPageAllowed) {
      setShowPasswordCheck(true);
    } else {
      setShowPasswordCheck(false);
    }
  }, [activeTab, myPageAllowed]);

  // 마이페이지를 벗어나면 myPageAllowed false로 초기화
  useEffect(() => {
    if (activeTab !== "MyPage" && myPageAllowed) {
      setMyPageAllowed(false);
      setPasswordInput(null);
    }
  }, [activeTab, myPageAllowed, setPasswordInput]);

  const handlePasswordCheck = (e) => {
    e.preventDefault();
    // 임시 비밀번호: test1234
    if (passwordInput === "test1234") {
      setMyPageAllowed(true);
      setShowPasswordCheck(false);
      setPasswordError("");
    } else {
      setMyPageAllowed(false);
      setShowPasswordCheck(false);
      setActiveTab(""); // 대시보드로
      setPasswordError("");
      setPasswordInput("");
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

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

  // 마이페이지 진입 시 비밀번호 확인 모달
  if (activeTab === "MyPage" && !myPageAllowed) {
    return (
      <div className="flex-1 p-8 bg-white flex flex-col items-center justify-center min-h-[100%]">
        <form
          onSubmit={handlePasswordCheck}
          className="bg-white border rounded-lg shadow-md p-8 flex flex-col items-center"
        >
          <label className="mb-4 text-lg font-semibold">
            비밀번호를 입력하세요
          </label>
          <input
            type="password"
            className="border px-4 py-2 rounded w-64 mb-4 focus:outline-none"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          {passwordError && (
            <span className="text-red-500 text-xs mb-2">{passwordError}</span>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            확인
          </button>
        </form>
      </div>
    );
  }

  if (activeTab === "MyPage" && myPageAllowed) {
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
