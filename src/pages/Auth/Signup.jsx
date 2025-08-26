import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { authServices } from "../../services/authServices";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    if (!emailVerified) {
      setError("root", {
        type: "manual",
        message: "이메일 인증을 완료해주세요.",
      });
      return;
    }

    try {
      // 이메일 조합
      const email = data.emailId + "@itc.ac.kr";

      const result = await authServices.signup(
        data.userId,
        data.password,
        data.firstName,
        data.lastName,
        email
      );

      if (result.success) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        // 서버에서 반환하는 구체적인 오류 메시지 처리
        let errorMessage = "회원가입에 실패했습니다.";

        if (result.message) {
          // 서버 응답에 따른 세분화된 오류 메시지/ 추후에 연결 후 오류 확인하고 해당 부분 삭제
          if (result.message.includes("이미 존재")) {
            errorMessage = "이미 사용 중인 아이디입니다.";
          } else if (result.message.includes("이메일")) {
            errorMessage = "이미 사용 중인 이메일입니다.";
          } else if (result.message.includes("비밀번호")) {
            errorMessage = "비밀번호 형식이 올바르지 않습니다.";
          } else if (result.message.includes("아이디")) {
            errorMessage = "아이디 형식이 올바르지 않습니다.";
          } else if (result.message.includes("이름")) {
            errorMessage = "이름을 올바르게 입력해주세요.";
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
      console.error("Signup error:", error);

      // 네트워크 오류 등에 따른 세분화된 메시지
      let errorMessage = "회원가입 처리 중 오류가 발생했습니다.";

      if (error.response) {
        // 서버 응답이 있는 경우
        const status = error.response.status;
        if (status === 400) {
          errorMessage = "입력 정보를 확인해주세요.";
        } else if (status === 409) {
          errorMessage = "이미 존재하는 계정입니다.";
        } else if (status === 500) {
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      } else if (error.request) {
        // 네트워크 오류
        errorMessage = "네트워크 연결을 확인해주세요.";
      }

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  const handleSendVerificationEmail = async () => {
    const emailId = getValues("emailId");
    if (!emailId) {
      alert("이메일을 먼저 입력해주세요.");
      return;
    }

    setIsSendingEmail(true);
    try {
      const email = emailId + "@itc.ac.kr";
      const result = await authServices.sendVerificationEmail(email);

      if (result.success) {
        setEmailSent(true);
        alert("인증 이메일이 발송되었습니다.");
      } else {
        // 이메일 발송 실패 시 세분화된 오류 메시지
        let errorMessage = "이메일 발송에 실패했습니다.";

        if (result.message) {
          if (result.message.includes("이미 사용")) {
            errorMessage = "이미 사용 중인 이메일입니다.";
          } else if (result.message.includes("형식")) {
            errorMessage = "올바른 이메일 형식이 아닙니다.";
          } else if (result.message.includes("도메인")) {
            errorMessage = "학교 이메일만 사용 가능합니다.";
          } else {
            errorMessage = result.message;
          }
        }

        alert(errorMessage);
      }
    } catch (error) {
      console.error("Send email error:", error);

      // 네트워크 오류 등에 따른 세분화된 메시지
      let errorMessage = "이메일 발송 중 오류가 발생했습니다.";

      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          errorMessage = "이메일 형식을 확인해주세요.";
        } else if (status === 429) {
          errorMessage =
            "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.";
        } else if (status === 500) {
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      } else if (error.request) {
        errorMessage = "네트워크 연결을 확인해주세요.";
      }

      alert(errorMessage);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    setIsVerifyingCode(true);
    try {
      const emailId = getValues("emailId");
      const email = emailId + "@itc.ac.kr";
      const result = await authServices.verifyEmailCode(
        email,
        verificationCode
      );

      if (result.success) {
        setEmailVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        // 인증번호 확인 실패 시 세분화된 오류 메시지
        let errorMessage = "인증번호가 올바르지 않습니다.";

        if (result.message) {
          if (result.message.includes("만료")) {
            errorMessage = "인증번호가 만료되었습니다. 다시 발송해주세요.";
          } else if (result.message.includes("횟수")) {
            errorMessage = "인증 시도 횟수를 초과했습니다. 다시 발송해주세요.";
          } else if (result.message.includes("이메일")) {
            errorMessage = "이메일 인증이 필요합니다.";
          } else {
            errorMessage = result.message;
          }
        }

        alert(errorMessage);
      }
    } catch (error) {
      console.error("Verify code error:", error);

      // 네트워크 오류 등에 따른 세분화된 메시지
      let errorMessage = "인증번호 확인 중 오류가 발생했습니다.";

      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          errorMessage = "인증번호를 올바르게 입력해주세요.";
        } else if (status === 404) {
          errorMessage = "인증번호를 찾을 수 없습니다. 다시 발송해주세요.";
        } else if (status === 500) {
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      } else if (error.request) {
        errorMessage = "네트워크 연결을 확인해주세요.";
      }

      alert(errorMessage);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // 비밀번호 확인 값
  const password = watch("password");

  // 아이디/비밀번호/비밀번호 재확인 중요도 순서 에러 메시지
  let passwordErrorMsg = "";
  if (errors.userId) {
    passwordErrorMsg = errors.userId.message;
  } else if (errors.password && errors.password.type === "required") {
    passwordErrorMsg = errors.password.message;
  } else if (errors.password && errors.password.type === "pattern") {
    passwordErrorMsg =
      "비밀번호는 대소문자와 특수문자를 포함한 8자 이상입니다.";
  } else if (errors.passwordCheck && errors.passwordCheck.type === "required") {
    passwordErrorMsg = errors.passwordCheck.message;
  } else if (errors.passwordCheck && errors.passwordCheck.type === "validate") {
    passwordErrorMsg = errors.passwordCheck.message;
  } else if (errors.root) {
    passwordErrorMsg = errors.root.message;
  }

  // 이름/이메일 중요도 순서 에러 메시지
  let nameEmailErrorMsg = "";
  if (errors.firstName) {
    nameEmailErrorMsg = errors.firstName.message;
  } else if (errors.lastName) {
    nameEmailErrorMsg = errors.lastName.message;
  } else if (errors.emailId) {
    nameEmailErrorMsg = errors.emailId.message;
  }

  return (
    <div className="p-20">
      {/* 로고 영역 */}
      <div className="flex justify-center items-center w-full mb-5">
        <p className="text-5xl font-bold text-blue-600 ">IToeic</p>
      </div>

      {/* 폼 시작 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="items-center p-10 w-full "
      >
        {/* ID, Password */}
        <div>
          <div className="flex justify-center items-center">
            <input
              className="border px-7 py-5 text-base w-[40%] rounded-t-3xl border-b-0 focus:outline-none"
              placeholder="ID"
              {...register("userId", { required: "아이디를 입력해주세요." })}
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="password"
              className="border px-7 py-5 text-lg w-[40%] border-b-0 focus:outline-none"
              placeholder="Password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                  message:
                    "비밀번호는 대소문자와 특수문자를 포함한 8자 이상입니다.",
                },
              })}
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="password"
              className="border px-7 py-5 text-lg w-[40%] rounded-b-3xl focus:outline-none"
              placeholder="Confirm Password"
              {...register("passwordCheck", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
            />
          </div>
          {/* 에러 메시지: 비밀번호 확인 인풋 아래에만 중요도 순서로 하나만 표시 */}
          <div className="flex justify-center items-center ml-2 mt-2 mb-10 min-h-[20px]">
            {passwordErrorMsg && (
              <span className="text-red-500 text-xs w-[40%]">
                {passwordErrorMsg}
              </span>
            )}
          </div>
        </div>

        {/* 이름 + 이메일 */}
        <div className="mb-10">
          <div className="flex justify-center items-center">
            <input
              className="border px-7 py-5 text-base w-[20%] rounded-tl-3xl border-r-0 border-b-0 focus:outline-none"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name을 입력해주세요.",
              })}
            />
            <input
              className="border px-7 py-5 text-base w-[20%] rounded-tr-3xl border-b-0 focus:outline-none"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name을 입력해주세요.",
              })}
            />
          </div>
          {/* 이메일 입력 (도메인 고정) */}
          <div className="flex justify-center items-center mt-0">
            <div className="flex w-[40%]">
              <input
                type="text"
                className="border px-7 py-5 text-lg rounded-bl-3xl rounded-br-none focus:outline-none w-full border-r-0"
                placeholder="School-issued Email"
                disabled={isSendingEmail}
                {...register("emailId", {
                  required: "학교 이메일을 입력해주세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+$/,
                    message: "학교 이메일을 올바르게 입력해주세요.",
                  },
                })}
                autoComplete="off"
              />
              <span className="border px-4 py-5 text-lg border-l-0 border-r-0 flex items-center select-none">
                @itc.ac.kr
              </span>
              {/* 이메일 인증 버튼 */}
              <div className="border px-2 py-5 text-lg rounded-br-3xl rounded-bl-none border-l-0 flex justify-center items-center min-w-[80px]">
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                    emailVerified
                      ? "text-gray-700 bg-gray-300 cursor-not-allowed"
                      : "text-white bg-blue-500 hover:bg-blue-700"
                  }`}
                  disabled={emailVerified || isSendingEmail}
                  onClick={handleSendVerificationEmail}
                >
                  {isSendingEmail
                    ? "발송 중..."
                    : emailVerified
                    ? "인증 완료"
                    : "인증"}
                </button>
              </div>
            </div>
          </div>

          {/* 인증번호 입력 */}
          {emailSent && !emailVerified && (
            <div className="flex justify-center items-center mt-2">
              <div className="flex w-[40%]">
                <input
                  type="text"
                  className="border px-4 py-2 text-base rounded-l focus:outline-none w-full border-r-0"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  className="text-sm px-4 py-2 rounded-r text-white bg-blue-500 hover:bg-blue-700"
                  onClick={handleVerifyCode}
                  disabled={isVerifyingCode}
                >
                  {isVerifyingCode ? "확인 중..." : "확인"}
                </button>
              </div>
            </div>
          )}

          {/* 에러 메시지: 이메일 인풋 아래에만 중요도 순서로 하나만 표시 */}
          <div className="flex justify-center items-center ml-2 mt-2 mb-4 min-h-[20px]">
            {nameEmailErrorMsg && (
              <span className="text-red-500 text-xs w-[40%]">
                {nameEmailErrorMsg}
              </span>
            )}
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <div className="flex flex-col items-center w-[40%] mx-auto">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 mb-1 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={isSubmitting || !emailVerified}
          >
            {isSubmitting ? "가입 중..." : "Sign up"}
          </button>
          <span className="mt-2 text-sm text-gray-500">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              로그인하러 가기
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
