import apiClient from "./apiClients";

export const authServices = {
  login: async (userId, password) => {
    const response = await apiClient.post("/api/user/login", {
      userId,
      password,
    });
    return response.data;
  },

  signup: async (userId, password, firstName, lastName, email) => {
    const response = await apiClient.post("/api/user/signup", {
      userId,
      password,
      firstName,
      lastName,
      email,
    });
    return response.data;
  },

  sendVerificationEmail: async (email) => {
    const response = await apiClient.post("/api/user/send-verification-email", {
      email,
    });
    return response.data;
  },

  verifyEmailCode: async (email, code) => {
    const response = await apiClient.post("/api/user/verify-email-code", {
      email,
      code,
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/api/user/logout");
    return response.data;
  },
};
