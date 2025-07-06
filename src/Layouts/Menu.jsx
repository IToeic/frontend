import React, { useState } from "react";
import menuItems from "../constant/index";

const Menu = ({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) => {
  //현재 선택된 탭
  //현재 선택된 서브탭
  const [hoveredTab, setHoveredTab] = useState(null);
  //마우스를 올린 탭
  const [expandedTab, setExpandedTab] = useState();
  //현재 펼쳐진 탭

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setExpandedTab(tabName); // 클릭 시 해당 탭을 고정
    // 기본 서브탭 설정
    const defaultSubTab = menuItems[tabName].subTabs[0].id;
    setActiveSubTab(defaultSubTab);
  };

  const handleSubTabClick = (subTabId) => {
    setActiveSubTab(subTabId);
  };

  return (
    <div className="w-48 bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-0">
          {Object.keys(menuItems).map((tabName) => (
            <div key={tabName} className="relative">
              <button
                onMouseEnter={() => setHoveredTab(tabName)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => handleTabClick(tabName)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tabName
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {menuItems[tabName].label}
              </button>

              {/* 서브탭 */}
              {(hoveredTab === tabName || expandedTab === tabName) && (
                <div className="w-full bg-white border-l-4 border-blue-200 shadow-sm">
                  <div className="p-2 space-y-1">
                    {menuItems[tabName].subTabs.map((subTab) => (
                      <button
                        key={subTab.id}
                        onClick={() => handleSubTabClick(subTab.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                          activeSubTab === subTab.id
                            ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div className="font-medium">{subTab.label}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {subTab.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Menu;
