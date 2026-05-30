import z from "zod";
import { Types } from "mongoose";

export const RatingSchema = z.object({
  raterId: z.instanceof(Types.ObjectId),
  targetId: z.instanceof(Types.ObjectId),
  score: z.number().min(1).max(5),
});

export const UserRatingSchema = z.object({
  average: z.number().min(0).max(5).default(0),
  count: z.number().min(0).default(0),
});

export type RatingType = z.infer<typeof RatingSchema>;
export type UserRatingType = z.infer<typeof UserRatingSchema>;
