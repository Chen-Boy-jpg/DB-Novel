import {
  request,
  requestWithReq,
  postWithResponse,
  delWithResponse,
  putWithResponse,
} from "../../api/request";

export const deleteNovel = async (
  nId: string,
  chapter: string
): Promise<any> => {
  console.log(nId, chapter);
  return delWithResponse(`/novel/delete?nId=${nId}&chapter=${chapter}`).then(
    (r) => r
  );
};

export const updateNovel = async (
  data:any,
  nId: string,
  chapter: string
): Promise<any> => {
  return putWithResponse(`/novel/put?nId=${nId}&chapter=${chapter}`, {
    data,
  }).then((r) => r);
};
