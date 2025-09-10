import React from "react";
import MenuItems from "../constant/index";
import useUserStore from "../stores/userStore";

// 모바일용 메뉴
const MobileMenu = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  activeSubTab,
  setActiveSubTab,
  expandedTab,
  setExpandedTab,
}) => {
  const { isLoggedIn } = useUserStore();

  const handleTabClick = (tabName) => {
    if (!isLoggedIn) return;
    setActiveTab(tabName);
    setExpandedTab(tabName);
    const subTab = MenuItems[tabName].subTabs[0].id;
    setActiveSubTab(subTab);
    onClose(); // 모바일에서는 메뉴 클릭 후 닫기
  };

  const handleSubTabClick = (subTabId) => {
    if (!isLoggedIn) return;
    const tabName = Object.keys(MenuItems).find((tabName) =>
      MenuItems[tabName].subTabs.some((subTab) => subTab.id === subTabId)
    );
    setActiveTab(tabName);
    setExpandedTab(tabName);
    setActiveSubTab(subTabId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* 모바일 메뉴 */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 lg:hidden">
        <div className="p-4">
          <nav className="space-y-2">
            {Object.keys(MenuItems).map((tabName) => (
              <div key={tabName}>
                <button
                  onClick={() => handleTabClick(tabName)}
                  disabled={!isLoggedIn}
                  className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    !isLoggedIn
                      ? "text-gray-400 cursor-not-allowed bg-gray-50"
                      : activeTab === tabName
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {MenuItems[tabName].label}
                </button>

                {/* 서브탭 - 모바일에서는 항상 표시 */}
                {activeTab === tabName && isLoggedIn && (
                  <div className="ml-4 mt-2 space-y-1">
                    {MenuItems[tabName].subTabs.map((subTab) => (
                      <button
                        key={subTab.id}
                        onClick={() => handleSubTabClick(subTab.id)}
                        disabled={!isLoggedIn}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                          !isLoggedIn
                            ? "text-gray-400 cursor-not-allowed bg-gray-50"
                            : activeSubTab === subTab.id
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
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
