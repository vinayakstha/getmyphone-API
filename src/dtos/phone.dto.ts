import z from "zod";

export const CreatePhoneDTO = z.object({
  title: z.string().min(1),
  brand: z.string(), // ObjectId as string from request
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
});

export type CreatePhoneDTO = z.infer<typeof CreatePhoneDTO>;

export const UpdatePhoneDTO = CreatePhoneDTO.partial();
export type UpdatePhoneDTO = z.infer<typeof UpdatePhoneDTO>;
