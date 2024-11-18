import { request, post, postWithResponse } from "../../api/request";

import * as Type from "../type/";

export const getAllMember = async (): Promise<
  Type.MemberListType["members"]
> => {
  return request(`/member/`, {}).then(
    (r) => Type.MemberListSchema.parse(r).members
  );
};

export const regiestMember = async (data: Type.RegiestType): Promise<any> => {
  return postWithResponse(`/member/regiest`, { data }).then((r) => r);
};
