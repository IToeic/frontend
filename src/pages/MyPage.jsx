import { useState, useEffect } from "react";
import { userServices } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

const MyPage = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { userId, username } = useUserStore();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
  });
  const { logout } = useUserStore();

  // MyPage 정보 불러오기
  useEffect(() => {
    const fetchMyPageInfo = async () => {
      if (!userId) {
        setError("로그인이 필요합니다.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      try {
        const result = await userServices.getMyPageInfo();
        console.log("MyPage API response:", result);

        if (result.success) {
          setFormData({
            id: result.userId || userId,
            email: result.email || "",
            name: result.name || username,
            password: "",
          });
          setError(null);
        } else {
          console.warn(
            "MyPage API response is not successful:",
            result.message
          );

          setError(
            result.message || "마이페이지 정보를 불러오는데 실패했습니다."
          );
        }
      } catch (error) {
        console.error("Failed to fetch MyPage info:", error);

        const errorMessage =
          error.userMessage || "마이페이지 정보를 불러오는데 실패했습니다.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPageInfo();
  }, [userId, username, navigate]);

  // 로그아웃 시 상태 초기화
  useEffect(() => {
    const handleLogout = () => {
      setShowPasswordModal(false);
      setEditing(false);
      setPassword("");
      setPasswordError("");
      setFormData({
        id: "",
        email: "",
        name: "",
        password: "",
      });
      setError(null);
      setLoading(false);
    };

    window.addEventListener("userLogout", handleLogout);
    return () => window.removeEventListener("userLogout", handleLogout);
  }, []);

  // 비밀번호 확인 모달 표시
  const handleShowPasswordModal = () => {
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  };

  // 비밀번호 확인 처리
  const handlePasswordVerification = async () => {
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    }

    setVerifying(true);
    setPasswordError("");

    try {
      const result = await userServices.verifyMyPageAccess(password);

      if (result.success) {
        setShowPasswordModal(false);
        setEditing(true);
      } else {
        setPasswordError(result.message || "비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Password verification error:", error);
      const errorMessage =
        error.userMessage || "마이페이지 접근 확인 중 오류가 발생했습니다.";
      setPasswordError(errorMessage);
    } finally {
      setVerifying(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    handleShowPasswordModal();
  };

  const handleSave = () => {
    setEditing(false);
    alert("수정 완료!");
  };

  if (loading) {
    return (
      <div className="p-20 max-w-2xl mx-auto min-h-[525px]">
        <h2 className="text-4xl font-bold text-blue-600 mb-10 text-center">
          My Page
        </h2>
        <div className="bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-200">
          <div className="text-center py-8">
            <div className="text-gray-600">사용자 정보를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-20 max-w-2xl mx-auto min-h-[525px]">
        <h2 className="text-4xl font-bold text-blue-600 mb-10 text-center">
          My Page
        </h2>
        <div className="bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-200">
          <div className="text-center py-8">
            <div className="text-red-600 mb-4">{error}</div>
            <div className="text-gray-600 text-sm">
              마이페이지 정보를 불러올 수 없습니다.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-20 max-w-2xl mx-auto min-h-[525px]">
      <h2 className="text-4xl font-bold text-blue-600 mb-10 text-center">
        My Page
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-200">
        {/* ID */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">ID</span>
          <span>{formData.id}</span>
        </div>

        {/* Email */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Email</span>
          <span>{formData.email}</span>
        </div>

        {/* Name */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Name</span>
          {editing ? (
            <input
              name="name"
              className="border px-4 py-1 rounded focus:outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.name}</span>
          )}
        </div>

        {/* Password 수정 영역 */}
        {editing && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">New Password</span>
            <input
              name="password"
              type="password"
              className="border px-4 py-1 rounded focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              placeholder="변경할 비밀번호"
            />
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-end space-x-3 mt-4">
          {editing ? (
            <>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setEditing(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                저장
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleEdit}
            >
              수정
            </button>
          )}
        </div>
      </div>

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h3 className="text-xl font-bold mb-4 text-center">
              비밀번호 확인
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              마이페이지 수정을 위해 비밀번호를 입력해주세요.
            </p>

            <div className="mb-4">
              <input
                type="password"
                className="w-full border px-4 py-2 rounded focus:outline-none"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" && handlePasswordVerification()
                }
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowPasswordModal(false)}
                disabled={verifying}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                onClick={handlePasswordVerification}
                disabled={verifying}
              >
                {verifying ? "확인 중..." : "확인"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
