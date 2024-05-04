import axiosGateway from "@/api/axiosGateway/axiosGateway";

export const bbsApi = {
  getBbsList: (category) => axiosGateway.get(`/bbs/${category}`),
};

export default bbsApi;
