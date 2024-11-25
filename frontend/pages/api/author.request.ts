import { request, requestWithReq, postWithResponse } from "./request";

export const getAllNovel = async (id: string): Promise<any> => {
  return request(`/novel`, {}).then((r) => r);
};

export const getNovelWithAuthor = async (name: string): Promise<any> => {
  return request(`/novel/${name}`, {}).then((r) => r);
};

export const createNovel=async (data): Promise<any> => {
  return postWithResponse(`/novel/`, {data}).then((r) => r);
};
export const getAllAuthor = async () => {
  return request(`/author/`, {}).then((r) => r);
};


export const getAuthorCount = async () => {
  return request(`/author/count`, {}).then((r) => r);
};