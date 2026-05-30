import z from "zod";
import { UserRatingSchema } from "./rating.type";

export const UserSchema = z.object({
  email: z.email(),
  fullName: z.string(),
  phoneNumber: z.string().min(10),
  password: z.string().min(6),
  profilePicture: z.string(),
  role: z.enum(["user", "admin"]).default("user"),
  rating: UserRatingSchema.default({ average: 0, count: 0 }),
});

export type UserType = z.infer<typeof UserSchema>;
