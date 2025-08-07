import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleSignupPage = () => {
    navigate("/signup");
  };

  // 에러 메시지 조건 분기
  let passwordErrorMsg = "";
  if (errors.id && errors.password) {
    passwordErrorMsg = errors.id.message;
  } else if (!errors.id && errors.password) {
    passwordErrorMsg = errors.password.message;
  }

  return (
    <div className="p-20">
      {/* 로고 영역 */}
      <div className="flex justify-center items-center w-full mt-10 mb-20">
        <p className="text-5xl font-bold text-blue-600 ">IToeic</p>
      </div>
      <div className="items-center p-10 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center">
            <input
              className="border px-7 py-5 text-base w-[30%] rounded-t-3xl border-b-0 focus:outline-none"
              placeholder="ID"
              {...register("id", { required: "ID를 입력해주세요." })}
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="password"
              className="border px-7 py-5 text-lg w-[30%] rounded-b-3xl focus:outline-none"
              placeholder="Password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
          </div>
          <div className="flex justify-center items-center ml-2 mt-2 mb-10 min-h-[20px]">
            {passwordErrorMsg && (
              <span className="text-red-500 text-xs w-[30%]">
                {passwordErrorMsg}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center w-[30%] mx-auto">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 mb-1 disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "Login"}
            </button>
            <button
              type="button"
              className="mt-2 text-sm text-gray-500 hover:text-blue-500 self-end"
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
