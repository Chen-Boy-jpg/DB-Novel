import { request, requestWithReq, postWithResponse } from "./request";

export const addBookshell = async (id: string): Promise<any> => {
  return postWithResponse(`/bookshell/new`, { mId: id }).then((r) => r);
};

export const getBookshell = async (id:string): Promise<any> => {
  return requestWithReq(`/bookshell/`, { mId: id }).then((r) => r);
};

export const getCollectionBymId = async (id:string): Promise<any> => {
  return request(`/collection/bookshell_data?mId=${id}`, {}).then((r) => r);
};
