import { useState, useEffect } from "react";
import { userServices } from "../services/userServices";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
  });

  // MyPage 정보 불러오기
  useEffect(() => {
    const fetchMyPageInfo = async () => {
      try {
        const result = await userServices.getMyPageInfo();
        console.log("MyPage API response:", result);
        
        if (result.success) {
          // Mock 응답에서는 최상위 레벨에 데이터가 있음
          setFormData({
            id: result.userId || result.data?.userId || "user123",
            email: result.email || result.data?.email || "user@example.com",
            name: result.name || result.data?.name || "홍길동",
            password: "",
          });
          setError(null);
        } else if (result.error === 'UNAUTHORIZED') {
          // 세션이 만료되었거나 로그인이 필요함
          console.error('로그인이 필요합니다:', result.message);
          setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
          // 3초 후 로그인 페이지로 리다이렉트
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          console.warn("MyPage API response is not successful:", result.message);
          setError(result.message || '마이페이지 정보를 불러오는데 실패했습니다.');
          // 기본값 사용
          setFormData({
            id: "user123",
            email: "user@example.com",
            name: "홍길동",
            password: "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch MyPage info:", error);
        setError('마이페이지 정보를 불러오는데 실패했습니다.');
        // 에러 시 기본값 사용
        setFormData({
          id: "user123",
          email: "user@example.com",
          name: "홍길동",
          password: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyPageInfo();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    alert("수정 완료!");
  };

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
    </div>
  );
};

export default MyPage;
