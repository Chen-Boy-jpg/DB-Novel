import { request, post, postWithResponse } from "./request";

export const getProfile = async () => {
  return request(`/member/profile`, {}).then((r) => r);
};

export const getAllNovel = async () => {
  return request(`/novel/`, {}).then((r) => r);
};

export const getAllAuthor = async () => {
  return request(`/author/`, {}).then((r) => r);
};
