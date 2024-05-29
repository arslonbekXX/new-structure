import { z } from 'zod';
import { taskScheme } from '../schema';

export const newSchema = taskScheme.omit({ id: true });
export const deleteSchema = taskScheme.pick({ id: true });

export type NewForm = z.infer<typeof newSchema>;
export type DeleteForm = z.infer<typeof deleteSchema>;
