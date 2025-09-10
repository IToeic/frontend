import React from "react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { authServices } from "../services/authServices";
import useUserStore from "../stores/userStore";

const Header = ({
  onLogoClick,
  setActiveTab,
  user,
  onMobileMenuToggle,
  isMobileMenuOpen,
}) => {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      const result = await authServices.logout();

      if (result) {
        logout();
        navigate("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("로그아웃 처리 중 오류가 발생했습니다.");
      navigate("/");
    }
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 영역 */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={onLogoClick}
                className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
              >
                IToeic
              </button>
            </div>
          </div>

          {/* 모바일용 메뉴 버튼 */}
          <div className="lg:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* 사용자 정보 및 마이페이지/로그아웃 버튼 */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{user?.username}</span>님 환영합니다
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => setActiveTab("MyPage")}
            >
              마이페이지
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
