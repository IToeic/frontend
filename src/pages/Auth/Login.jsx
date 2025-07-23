import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/"); // Main으로 이동
  };

  const handleSignupPage = () => {
    navigate("/signup");
  };

  return (
    <div className="p-20">
      {/* 로고 영역 */}
      <div className="flex justify-center items-center w-full mt-10 mb-20">
        <p className="text-5xl font-bold text-blue-600 ">IToeic</p>
      </div>
      <div className="items-center p-10 w-full">
        <div className="flex justify-center items-center">
          <input
            className="border px-7 py-5 text-base w-[30%] rounded-t-3xl border-b-0 focus:outline-none"
            placeholder="ID"
          />
        </div>
        <div className="flex justify-center items-center">
          <input
            className="border px-7 py-5 text-lg w-[30%] mb-10 rounded-b-3xl focus:outline-none"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col items-center w-[30%] mx-auto">
          <button
            className="w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 mb-1"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="mt-2 text-sm text-gray-500 hover:text-blue-500 self-end"
            onClick={handleSignupPage}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
