import { z } from "zod";

export const recordSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z.string().max(1000).optional(),
  content: z.string().max(50000).optional(),
  status: z.enum(["ACTIVE", "ARCHIVED", "COMPLETED", "PENDING"]).optional().default("ACTIVE"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional().default("MEDIUM"),
  dueDate: z.string().optional().nullable(),
  tags: z.array(z.string().max(50)).max(10).optional().default([]),
  categoryId: z.string().optional().nullable(),
});

export const updateRecordSchema = recordSchema.partial();

export type RecordInput = z.infer<typeof recordSchema>;
export type UpdateRecordInput = z.infer<typeof updateRecordSchema>;
