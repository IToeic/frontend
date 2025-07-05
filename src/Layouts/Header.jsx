import React from "react";

const Header = ({ onLogoClick }) => {
  // 임시 사용자 데이터 (나중에 실제 로그인 상태와 연결)
  const user = {
    username: "사용자명",
    isLoggedIn: true,
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 영역 */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={onLogoClick}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
              >
                IToeic
              </button>
            </div>
          </div>

          {/* 사용자 정보 및 마이페이지 버튼 */}
          <div className="flex items-center space-x-4">
            {user.isLoggedIn ? (
              <>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{user.username}</span>님
                  환영합니다
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  마이페이지
                </button>
              </>
            ) : (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
