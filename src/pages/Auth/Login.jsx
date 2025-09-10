import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authServices } from "../../services/authServices";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await authServices.login(data.id, data.password);

      if (result.success) {
        onLogin(result); // 전체 응답을 전달
        navigate("/");
      } else {
        // 서버에서 반환하는 구체적인 오류 메시지 처리
        let errorMessage = "로그인에 실패했습니다.";

        if (result.message) {
          // 서버 응답에 따른 세분화된 오류 메시지/ 추후에 연결 후 오류 확인하고 해당 부분 삭제
          if (result.message.includes("존재하지 않습니다")) {
            errorMessage = "존재하지 않는 아이디입니다.";
          } else if (result.message.includes("비밀번호")) {
            errorMessage = "비밀번호가 올바르지 않습니다.";
          } else if (result.message.includes("인증")) {
            errorMessage = "이메일 인증이 필요합니다.";
          } else if (result.message.includes("차단")) {
            errorMessage = "계정이 일시적으로 차단되었습니다.";
          } else {
            errorMessage = result.message;
          }
        }

        setError("root", {
          type: "manual",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      // API 인터셉터에서 설정한 사용자 친화적인 메시지 사용
      const errorMessage =
        error.userMessage || "로그인 처리 중 오류가 발생했습니다.";

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  const handleSignupPage = () => {
    navigate("/signup");
  };

  // 에러 메시지 조건 분기
  let passwordErrorMsg = "";
  if (errors.id) {
    passwordErrorMsg = errors.id.message;
  } else if (errors.password) {
    passwordErrorMsg = errors.password.message;
  } else if (errors.root) {
    passwordErrorMsg = errors.root.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 로고 영역 */}
        <div className="text-center">
          <p className="text-4xl sm:text-5xl font-bold text-blue-600">IToeic</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ID"
              {...register("id", { required: "ID를 입력해주세요." })}
            />
            <input
              type="password"
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
          </div>

          {passwordErrorMsg && (
            <div className="text-center">
              <span className="text-red-500 text-sm">{passwordErrorMsg}</span>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "Login"}
            </button>
            <button
              type="button"
              className="w-full text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200"
              onClick={handleSignupPage}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
