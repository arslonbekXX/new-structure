import { Router } from 'express';
import { tasks } from '../db';
import { taskSchema, type Task } from '../schema';
import { faker } from '@faker-js/faker';

const router = Router();

router.get('/', (req, res) => {
	res.send({ tasks });
});

router.get('/:taskId', (req, res) => {
	const taskId = req.params.taskId;

	const task = tasks.find((task) => task.id === taskId);

	if (!task)
		return res
			.status(404)
			.send({ id: 'task not found', message: `task not found with id = ${taskId}` });

	setTimeout(() => {
		res.send({ task });
	}, 2000);
});

router.post('/', (req, res) => {
	const result = taskSchema.partial({ id: true }).safeParse(req.body);

	if (!result.success) {
		// If validation fails, send a 400 response with error details
		return res.status(400).json(result.error.format());
	}

	const task = result.data;
	task.id = faker.string.uuid();

	tasks.unshift(task as Task);

	res.send({ task });
});

router.put('/:taskId', (req, res) => {
	const taskId = req.params.taskId;

	const taskIdx = tasks.findIndex((task) => task.id === taskId);

	if (taskIdx === -1)
		return res
			.status(404)
			.send({ id: 'task not found', message: `task not found with id = ${taskId}` });

	const result = taskSchema.omit({ id: true }).safeParse(req.body);

	if (!result.success) {
		// If validation fails, send a 400 response with error details
		return res.status(400).json(result.error.format());
	}

	const newTask = result.data;

	tasks[taskIdx] = { ...tasks[taskIdx], ...newTask };

	res.send({ task: tasks[taskIdx] });
});

router.delete('/:taskId', (req, res) => {
	const taskId = req.params.taskId;

	const taskIdx = tasks.findIndex((task) => task.id === taskId);

	if (taskIdx === -1)
		return res
			.status(404)
			.send({ id: 'task not found', message: `task not found with id = ${taskId}` });

	const [deletedTask] = tasks.splice(taskIdx, 1);

	return res.send({ task: deletedTask });
});

export default router;
