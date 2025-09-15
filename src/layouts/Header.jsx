import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/images/logo.png";

const Header = ({
  onLogoClick,
  setActiveTab,
  onMobileMenuToggle,
  isMobileMenuOpen,
}) => {
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
                <img className="h-24 mt-2" src={logo} alt="logo" />
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

          <div className="hidden lg:flex items-center space-x-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
