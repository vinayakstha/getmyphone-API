import z from "zod";
import { Types } from "mongoose";

export const PhoneSchema = z.object({
  title: z.string().min(1),
  photo: z.string(),
  brand: z.instanceof(Types.ObjectId),
  condition: z.enum(["new", "like_new", "good", "fair", "poor"]),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]), // [lng, lat]
  }),
  description: z.string().min(1),
  cpu: z.string(),
  storage: z.string(),
  ram: z.string(),
  screen: z.string(),
  battery: z.string(),
  camera: z.string(),
  usedFor: z.string(),
  negotiable: z.enum(["yes", "no"]),
  price: z.number().min(0),
  seller: z.instanceof(Types.ObjectId),
});

export type PhoneType = z.infer<typeof PhoneSchema>;
