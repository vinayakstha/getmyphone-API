import z from "zod";
import { Types } from "mongoose";

export const SavedSchema = z.object({
  user: z.instanceof(Types.ObjectId),
  phone: z.instanceof(Types.ObjectId),
});

export type SavedType = z.infer<typeof SavedSchema>;
