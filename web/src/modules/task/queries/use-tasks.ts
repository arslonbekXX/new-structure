import { useQuery } from '@tanstack/react-query';
import { Task, taskScheme } from '../schema';
import { http } from '../../../service';

interface Query {
	tasks: Task[];
}

export const useTasks = () => {
	const initialData: Query = { tasks: [] };

	const { data = initialData, ...args } = useQuery<Query>({
		queryKey: ['task', 'list'],
		queryFn: async () => {
			const { data } = await http.get('/tasks');

			const tasks: Task[] = (data.tasks || []).map(taskScheme.parse);

			return { tasks };
		},
	});

	return { ...data, ...args };
};
