import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import MyPage from "./pages/MyPage";
import Header from "./layouts/Header";
import Menu from "./layouts/Menu";
import Main from "./pages/Main";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 탭 상태
  const [activeTab, setActiveTab] = useState();
  const [activeSubTab, setActiveSubTab] = useState();
  const [expandedTab, setExpandedTab] = useState();

  const handleLogoClick = () => {
    setActiveTab(null);
    setActiveSubTab(null);
    setExpandedTab(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 안 된 상태 */}
        {!isLoggedIn ? (
          <>
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/signup" element={<Signup />} />
            {/* 로그인 안했으면 무조건 /login으로 리디렉트 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          // 로그인 된 상태
          <Route
            path="/*"
            element={
              <div className="h-screen flex flex-col bg-gray-100">
                <Header
                  onLogoClick={handleLogoClick}
                  setActiveTab={setActiveTab}
                />
                <div className="flex-1 flex">
                  <Menu
                    className="w-64 bg-white shadow"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    expandedTab={expandedTab}
                    setExpandedTab={setExpandedTab}
                  />
                  <div className="flex-1 overflow-y-auto">
                    <Main
                      activeTab={activeTab}
                      activeSubTab={activeSubTab}
                      setActiveTab={setActiveTab}
                      setActiveSubTab={setActiveSubTab}
                      setExpandedTab={setExpandedTab}
                    />
                  </div>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
