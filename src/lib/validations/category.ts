import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  description: z.string().max(200).optional(),
  color: z.string().optional().default("#6366f1"),
  icon: z.string().max(50).optional().default("folder"),
});

export const updateCategorySchema = categorySchema.partial();

export type CategoryInput = z.infer<typeof categorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
