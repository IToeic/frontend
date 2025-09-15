import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import MobileMenu from "../layouts/MobileMenu";
import Main from "../pages/Main";

const UserRoutes = () => {
  const [activeTab, setActiveTab] = useState();
  const [activeSubTab, setActiveSubTab] = useState();
  const [expandedTab, setExpandedTab] = useState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setActiveTab(null);
    setActiveSubTab(null);
    setExpandedTab(null);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        onLogoClick={handleLogoClick}
        setActiveTab={setActiveTab}
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="hidden lg:block">
          <Menu
            className="w-64 bg-white shadow"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            expandedTab={expandedTab}
            setExpandedTab={setExpandedTab}
          />
        </div>
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
      {/* 모바일 메뉴 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        expandedTab={expandedTab}
        setExpandedTab={setExpandedTab}
      />
    </div>
  );
};

export default UserRoutes;
