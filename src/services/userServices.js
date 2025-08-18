import apiClient from "./apiClients";

export const userServices = {
  verifyMyPageAccess: async (password) => {
    const response = await apiClient.post("/api/user/mypage/verify", {
      password,
    });
    return response.data;
  },

  getMyPageInfo: async () => {
    const response = await apiClient.get("/api/user/mypage");
    return response.data;
  },

  updateProfile: async (newName, newPassword) => {
    const requestData = { newName };
    if (newPassword) {
      requestData.newPassword = newPassword;
    }
    const response = await apiClient.put("/api/user/mypage", requestData);
    return response.data;
  },
};
