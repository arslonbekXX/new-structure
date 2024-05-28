import { faker } from '@faker-js/faker';
import { taskStatusSchema, type Task } from './schema';

export const tasks: Task[] = Array.from({ length: 20 }, () => {
	return {
		id: faker.string.uuid(),
		title: faker.person.jobTitle(),
		description: faker.commerce.productDescription(),
		status: taskStatusSchema.options[Math.floor(Math.random() * taskStatusSchema.options.length)],
	};
});
