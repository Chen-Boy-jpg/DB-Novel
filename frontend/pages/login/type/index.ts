import { string, z } from "zod";

export const RegiestSchema = z.object({
  mName: z.string().optional(),
  gender: z.string().optional(),
  email: z.string().optional(),
  birthday: z.string().optional(),
  password: z.string().optional(),
});

export const MemberSchema = z.object({
  mId: z.string(),
  mName: z.string().optional(),
  gender: z.string().optional(),
  email: z.string().optional(),
  birthday: z.string().optional(),
  password: z.string().optional(),
});

export const MemberListSchema = z.object({
  members: z.array(MemberSchema),
});

export type RegiestType = z.infer<typeof RegiestSchema>;
export type MemberType = z.infer<typeof MemberSchema>;
export type MemberListType = z.infer<typeof MemberListSchema>;
