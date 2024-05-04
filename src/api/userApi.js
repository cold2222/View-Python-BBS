import axiosGateway from "@/api/axiosGateway/axiosGateway";

export const userApi = {
  saveProfile: (formData) => axiosGateway.put("/auth/user", formData),
  signIn: (data) => axiosGateway.post("/user/sign-in", data),
  signUp: (formData) => axiosGateway.post("/user", formData),
  kakaoSignIn: (code) =>
    axiosGateway.post("/user/social-login/kakao", { code }),
  googleSignIn: (code) =>
    axiosGateway.post("/user/social-login/google", { code }),
  deleteAccount: () => axiosGateway.delete("/auth/user"),
  userDuplicateCheck: (data) =>
    axiosGateway.post("/user/duplicate-check", data),
};

export default userApi;
