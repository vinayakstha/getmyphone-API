import z from "zod";

export const SubmitRatingDTO = z.object({
  targetId: z.string(),
  score: z.number().min(1).max(5),
});

export type SubmitRatingDTO = z.infer<typeof SubmitRatingDTO>;
