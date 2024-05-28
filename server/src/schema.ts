import { z } from 'zod';

export const taskStatusSchema = z.enum([
	'TODO',
	'IN PROGRESS',
	'CODE REVIEW',
	'TEST',
	'PRE PRODUCTION',
	'READY',
	'DONE',
]);

export const taskSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	description: z.string(),
	status: taskStatusSchema,
});

export type Task = z.infer<typeof taskSchema>;

export type Status = z.infer<typeof taskStatusSchema>;
