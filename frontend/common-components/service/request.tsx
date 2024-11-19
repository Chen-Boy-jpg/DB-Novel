import { request, post, postWithResponse } from "@/pages/api/request";

export const getProfile = async () => {
  return request(`/member/profile`, {}).then((r) => r);
};

export const logout = async () => {
  return postWithResponse(`/member/logout`, {}).then((r) => r);
};
