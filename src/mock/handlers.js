import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/test", () => {
    return HttpResponse.json({
      success: true,
      message: "Hello MSW! 👋",
    });
  }),
];
