import { z } from "zod";

export const bikeCompareSearchSchema = z.object({
  leftBikeId: z.string().optional(),
  rightBikeId: z.string().optional(),
});
