import apiClient from "./apiClients";

export const userServices = {
  verifyMyPageAccess: async (password) => {
    try {
      const response = await apiClient.post("/api/user/mypage/verify", {
        password,
      });
      return response.data;
    } catch (error) {
      console.error("MyPage verification error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        code: error.code,
        config: error.config,
      });

      throw error;
    }
  },

  getMyPageInfo: async () => {
    try {
      const response = await apiClient.get("/api/user/mypage");
      return response.data;
    } catch (error) {
      console.error("GetMyPageInfo error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error; // 에러를 다시 throw하여 컴포넌트에서 처리할 수 있도록 함
    }
  },

  updateProfile: async (newName, newPassword) => {
    try {
      const requestData = { newName };
      if (newPassword) {
        requestData.newPassword = newPassword;
      }
      const response = await apiClient.put("/api/user/mypage", requestData);
      return response.data;
    } catch (error) {
      console.error("Update profile error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error; // 에러를 다시 throw하여 컴포넌트에서 처리할 수 있도록 함
    }
  },
};
