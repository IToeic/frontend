import { useState } from "react";

const MyPage = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "toeic_user1",
    email: "user@school.edu",
    name: "John Doe",
    password: "",
  });

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
