import React, { useState } from "react";
import MenuItems from "../constant/index";

const Menu = ({
  activeTab,
  setActiveTab,
  activeSubTab,
  setActiveSubTab,
  expandedTab,
  setExpandedTab,
}) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  //마우스를 올린 탭

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setExpandedTab(tabName);
    const subTab = MenuItems[tabName].subTabs[0].id;
    setActiveSubTab(subTab);
  };

  const handleSubTabClick = (subTabId) => {
    const tabName = Object.keys(MenuItems).find((tabName) =>
      MenuItems[tabName].subTabs.some((subTab) => subTab.id === subTabId)
    );
    setActiveTab(tabName);
    setExpandedTab(tabName);
    setActiveSubTab(subTabId);
  };

  return (
    <div className="w-48 bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-0">
          {Object.keys(MenuItems).map((tabName) => (
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
                {MenuItems[tabName].label}
              </button>

              {/* 서브탭 */}
              <div
                className={`w-full bg-white border-l-4 border-blue-200 shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${
                  hoveredTab === tabName || expandedTab === tabName
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                onMouseEnter={() => setHoveredTab(tabName)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <div className="p-2 space-y-1">
                  {MenuItems[tabName].subTabs.map((subTab) => (
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
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Menu;
