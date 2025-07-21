import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/"); // Main으로 이동
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
