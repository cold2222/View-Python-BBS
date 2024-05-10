import axiosGateway from "@/api/axiosGateway/axiosGateway";

export const bbsApi = {
  getBbsList: (category, page, sort, keyword, starting_point) =>
    axiosGateway.get(
      `/bbs/${category}?page=${page}&sort=${sort}&keyword=${keyword}&starting_point=${starting_point}`
    ),
  getBbs: (bbs_pk) => axiosGateway.get(`/bbs/detail/${bbs_pk}`),
  writeBbs: (data) => axiosGateway.post("/auth/bbs", data),
};

export default bbsApi;
