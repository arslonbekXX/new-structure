import { z } from 'zod';

export const taskStatusSchema = z.enum([
	'TODO',
	'IN PROGRESS',
	'CODE REVIEW',
	'TEST',
	'PRE PRODUCTION',
	'READY',
	'DONE',
	'READY PRODUCTION',
]);

export const taskScheme = z.object({
	id: z.string(),
	title: z.coerce.string(),
	description: z.coerce.string(),
	status: taskStatusSchema,
});

export type Task = z.infer<typeof taskScheme>;
export type Status = z.infer<typeof taskStatusSchema>;
