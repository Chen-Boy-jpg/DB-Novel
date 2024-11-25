import { request, post, postWithResponse } from "./request";

import * as Type from "../../libs/type";

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

export const loginRequest = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  return postWithResponse(`/member/login`, { data }).then((r) => r);
};

export const getProfile = async () => {
  return request(`/member/profile`, {}).then((r) => r);
};
