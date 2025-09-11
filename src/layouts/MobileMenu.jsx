import React from "react";
import MenuItems from "../constant/index";
// import useUserStore from "../stores/userStore";

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
  // 임시 연결 - 로그인 체크 제거
  // const { isLoggedIn } = useUserStore();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setExpandedTab(tabName);
    const subTab = MenuItems[tabName].subTabs[0].id;
    setActiveSubTab(subTab);
    onClose(); // 모바일에서는 메뉴 클릭 후 닫기
  };

  const handleSubTabClick = (subTabId) => {
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
      <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 lg:hidden">
        <div className="p-4">
          {/* 닫기 버튼 */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="space-y-2">
            {/* 탭 */}
            {Object.keys(MenuItems).map((tabName) => (
              <div key={tabName}>
                <button
                  onClick={() => handleTabClick(tabName)}
                  className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === tabName
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  {MenuItems[tabName].label}
                </button>
                {/* 서브탭 */}
                <div className="ml-4 mt-1 space-y-1">
                  {MenuItems[tabName].subTabs.map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => handleSubTabClick(subTab.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors duration-200 ${
                        activeSubTab === subTab.id
                          ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                          : "text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <div className="font-medium">{subTab.label}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {subTab.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
