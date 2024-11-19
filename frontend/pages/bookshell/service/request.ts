import { request, requestWithReq, postWithResponse } from "../../api/request";

export const addBookshell = async (id: string): Promise<any> => {
  return postWithResponse(`/bookshell/new`, { mId: id }).then((r) => r);
};

export const getBookshell = async (id:string): Promise<any> => {
  return requestWithReq(`/bookshell/`, { mId: id }).then((r) => r);
};
