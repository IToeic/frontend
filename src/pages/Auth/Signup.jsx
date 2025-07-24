import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [idCheck, setIdCheck] = useState(false);
  let userIdInput = useRef();
  let [checkAuthentication, setCheckAuthentication] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // 여기에 회원가입 처리 로직
    navigate("/login");
  };

  return (
    <div className="p-20">
      {/* 로고 영역 */}
      <div className="flex justify-center items-center w-full mb-5">
        <p className="text-5xl font-bold text-blue-600 ">IToeic</p>
      </div>

      {/* 폼 시작 */}
      <form onSubmit={handleSignup} className="items-center p-10 w-full mb-10">
        {/* ID, Password */}
        <div>
          <div className="flex justify-center items-center">
            <input
              name="userId"
              className="border px-7 py-5 text-base w-[40%] rounded-t-3xl border-b-0 focus:outline-none"
              placeholder="ID"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              name="password"
              type="password"
              className="border px-7 py-5 text-lg w-[40%] rounded-b-3xl focus:outline-none"
              placeholder="Password"
              required
            />
          </div>
          <p
            className={`flex items-center ml-[32%] h-10 ${
              idCheck ? "text-gray-400" : "text-red-700"
            }`}
          >
            {idCheck ? "" : "사용할 수 없는 ID입니다."}
          </p>
        </div>

        {/* 이름 */}
        <div className="mb-10">
          <div className="flex justify-center items-center">
            <input
              name="firstName"
              className="border px-7 py-5 text-base w-[20%] rounded-tl-3xl border-r-0 border-b-0 focus:outline-none"
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              className="border px-7 py-5 text-base w-[20%] rounded-tr-3xl border-b-0 focus:outline-none"
              placeholder="Last Name"
              required
            />
          </div>

          {/* 이메일 인증 */}
          <div className="flex justify-center items-center">
            <div
              className={`flex justify-between border px-7 py-5 text-lg w-[40%] ${
                checkAuthentication ? "border-b-0" : "rounded-b-3xl"
              } focus:outline-none`}
            >
              <input
                name="email"
                type="email"
                className="focus:outline-none w-[70%]"
                placeholder="School-issued Email"
                required
              />
              <button
                type="button"
                className={`text-sm px-4 rounded ${
                  checkAuthentication
                    ? "text-gray-700 bg-gray-300"
                    : "text-white bg-blue-500 hover:bg-blue-700"
                }`}
                disabled={checkAuthentication}
                onClick={() => setCheckAuthentication(true)}
              >
                인증
              </button>
            </div>
          </div>

          {/* 인증번호 입력 */}
          {checkAuthentication && (
            <div className="flex justify-center items-center">
              <div className="flex justify-between border px-7 py-5 text-lg w-[40%] focus:outline-none rounded-b-3xl">
                <input
                  name="authCode"
                  className="focus:outline-none w-[70%]"
                  placeholder="인증번호 입력"
                  required
                />
                <button
                  type="button"
                  className="text-sm px-4 rounded text-white bg-blue-500 hover:bg-blue-700"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 회원가입 버튼 */}
        <div className="flex flex-col items-center w-[40%] mx-auto">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 mb-1"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
