import { request, post, postWithResponse } from "../../api/request";

export const getProfile = async () => {
  return request(`/member/profile`, {}).then((r) => r);
};
