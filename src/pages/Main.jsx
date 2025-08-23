import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { userServices } from "../services/userServices";
import { wordServices } from "../services/wordServices";
import useUserStore from "../stores/userStore";

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
  const [wordPackProgress, setWordPackProgress] = useState(0);
  const { userId } = useUserStore();

  const indexes = indexesWithWordPackChoice;

  const wordPackChoiceCheck = indexes.includes(activeTab);

  const emptyWordPack = wordPackChoiceCheck && selectedWordPack === 0;

  const dev = false;
  const navigate = useNavigate();

  // 단어팩 진행도 가져오기
  useEffect(() => {
    const fetchWordPackProgress = async () => {
      if (!userId || !selectedWordPack) {
        setWordPackProgress(0);
        return;
      }

      try {
        const progressData = await wordServices.getWordpackProgress(userId);
        const currentProgress = progressData?.find(
          (pack) => pack.wordpackId === selectedWordPack
        );
        
        if (currentProgress) {
          // 50/50이면 진행도 1로 설정 (완료로 간주)
          const progress = currentProgress.completeCount >= currentProgress.totalWords ? 1 : 0;
          setWordPackProgress(progress);
          console.log('단어팩 진행도:', currentProgress.completeCount, '/', currentProgress.totalWords, '=', progress);
        } else {
          setWordPackProgress(0);
        }
      } catch (error) {
        console.error("Failed to fetch wordpack progress:", error);
        setWordPackProgress(0);
      }
    };

    fetchWordPackProgress();
  }, [userId, selectedWordPack]);

  useEffect(() => {
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
    wordPackProgress,
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
      setPasswordInput("");
    }
  }, [activeTab, myPageAllowed]);

  // 마이페이지에 진입하면 탭 상태 초기화
  useEffect(() => {
    if (activeTab === "MyPage" && myPageAllowed) {
      setActiveSubTab(null);
      setExpandedTab(null);
    }
  }, [activeTab, myPageAllowed, setActiveSubTab, setExpandedTab]);

  const handlePasswordCheck = async (e) => {
    e.preventDefault();

    try {
      const result = await userServices.verifyMyPageAccess(passwordInput);

      if (result.success) {
        setMyPageAllowed(true);
        setShowPasswordCheck(false);
        setPasswordError("");
        setPasswordInput("");
      } else {
        setMyPageAllowed(false);
        setShowPasswordCheck(false);
        setActiveTab(""); // 대시보드로
        setPasswordError("");
        setPasswordInput("");
        alert(result.message || "비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("MyPage verification error:", error);
      
      if (error.response?.status === 401) {
        alert("비밀번호가 올바르지 않습니다.");
        setPasswordError("비밀번호를 다시 확인해주세요.");
      } else {
        alert("마이페이지 접근 확인 중 오류가 발생했습니다.");
        navigate("/");
      }
    }
  };

  const tabComponents = {
    Word: {
      Study: (
        <WordStudy
          setActiveSubTab={setActiveSubTab}
          selectedWordPack={selectedWordPack}
        />
      ),
      TodayTest: <WordTest selectedWordPack={selectedWordPack} />,
    },
    Test: {
      Test: <WordPackTest dev={dev} selectedWordPack={selectedWordPack} />,
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
