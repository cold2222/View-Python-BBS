import axiosGateway from "@/api/axiosGateway/axiosGateway";

export const bbsApi = {
  getBbsList: (category, page, sort, starting_point) =>
    axiosGateway.get(
      `/bbs/${category}?page=${page}&sort=${sort}&starting_point=${starting_point}`
    ),
  getBbs: (bbs_pk) => axiosGateway.get(`/bbs/detail/${bbs_pk}`),
};

export default bbsApi;
