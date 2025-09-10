import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { authServices } from "../../services/authServices";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Signup = () => {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [selectedEmailDomain, setSelectedEmailDomain] = useState("gmail.com");
  const [customEmailDomain, setCustomEmailDomain] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 이메일 도메인 옵션
  const emailDomains = [
    { value: "gmail.com", label: "gmail.com" },
    { value: "naver.com", label: "naver.com" },
    { value: "daum.net", label: "daum.net" },
    { value: "hotmail.com", label: "hotmail.com" },
    { value: "itc.ac.kr", label: "itc.ac.kr" },
    { value: "custom", label: "직접 입력" },
  ];

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
      const domain =
        selectedEmailDomain === "custom"
          ? customEmailDomain
          : selectedEmailDomain;
      const email = data.emailId + "@" + domain;

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

      // API 인터셉터에서 설정한 사용자 친화적인 메시지 사용
      const errorMessage =
        error.userMessage || "회원가입 처리 중 오류가 발생했습니다.";

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
      const domain =
        selectedEmailDomain === "custom"
          ? customEmailDomain
          : selectedEmailDomain;
      const email = emailId + "@" + domain;
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

      // API 인터셉터에서 설정한 사용자 친화적인 메시지 사용
      const errorMessage =
        error.userMessage || "이메일 발송 중 오류가 발생했습니다.";

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
      const domain =
        selectedEmailDomain === "custom"
          ? customEmailDomain
          : selectedEmailDomain;
      const email = emailId + "@" + domain;
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

      const errorMessage =
        error.userMessage || "인증번호 확인 중 오류가 발생했습니다.";

      alert(errorMessage);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // 비밀번호 확인 값
  const password = watch("password");

  // 이메일 도메인 선택 핸들러
  const handleEmailDomainSelect = (domain) => {
    setSelectedEmailDomain(domain);
    setIsDropdownOpen(false);
    if (domain !== "custom") {
      setCustomEmailDomain("");
    }
  };

  // 커스텀 도메인 입력 핸들러
  const handleCustomDomainChange = (e) => {
    setCustomEmailDomain(e.target.value);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 로고 영역 */}
        <div className="text-center">
          <p className="text-4xl sm:text-5xl font-bold text-blue-600">IToeic</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ID, Password */}
          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ID"
              {...register("userId", { required: "아이디를 입력해주세요." })}
            />
            <input
              type="password"
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <input
              type="password"
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm Password"
              {...register("passwordCheck", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
            />
          </div>

          {passwordErrorMsg && (
            <div className="text-center">
              <span className="text-red-500 text-sm">{passwordErrorMsg}</span>
            </div>
          )}

          {/* 이름 */}
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name을 입력해주세요.",
              })}
            />
            <input
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name을 입력해주세요.",
              })}
            />
          </div>

          {/* 이메일 입력 */}
          <div className="space-y-4">
            {/* 이메일 아이디 입력 */}
            <input
              type="text"
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="이메일 아이디"
              disabled={isSendingEmail}
              {...register("emailId", {
                required: "이메일 아이디를 입력해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: "올바른 이메일 아이디를 입력해주세요.",
                },
              })}
              autoComplete="off"
            />

            {/* 이메일 도메인 선택 */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
              >
                <span className="text-sm">
                  @
                  {selectedEmailDomain === "custom"
                    ? customEmailDomain || "직접 입력"
                    : selectedEmailDomain}
                </span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {emailDomains.map((domain) => (
                    <button
                      key={domain.value}
                      type="button"
                      onClick={() => handleEmailDomainSelect(domain.value)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                    >
                      @{domain.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 커스텀 도메인 입력 */}
            {selectedEmailDomain === "custom" && (
              <input
                type="text"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="도메인을 입력하세요 (예: example.com)"
                value={customEmailDomain}
                onChange={handleCustomDomainChange}
              />
            )}

            {/* 이메일 인증 버튼 */}
            <button
              type="button"
              className={`w-full px-4 py-3 text-base rounded-lg font-medium transition-colors duration-200 ${
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
                : "이메일 인증"}
            </button>

            {/* 인증번호 입력 */}
            {emailSent && !emailVerified && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  className="px-6 py-3 text-base rounded-lg text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                  onClick={handleVerifyCode}
                  disabled={isVerifyingCode}
                >
                  {isVerifyingCode ? "확인 중..." : "확인"}
                </button>
              </div>
            )}
          </div>

          {nameEmailErrorMsg && (
            <div className="text-center">
              <span className="text-red-500 text-sm">{nameEmailErrorMsg}</span>
            </div>
          )}

          {/* 회원가입 버튼 */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isSubmitting || !emailVerified}
            >
              {isSubmitting ? "가입 중..." : "Sign up"}
            </button>
            <div className="text-center">
              <span className="text-sm text-gray-500">
                이미 계정이 있으신가요?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  로그인하러 가기
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
