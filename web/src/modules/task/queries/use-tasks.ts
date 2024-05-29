import { useQuery } from '@tanstack/react-query';
import { Task, taskScheme } from '../schema';
import { http } from '../../../service';

interface Query {
	tasks: Task[];
}

interface Params {
	search: string;
}

export const useTasks = ({ search }: Params) => {
	const initialData: Query = { tasks: [] };

	const { data = initialData, ...args } = useQuery<Query>({
		queryKey: ['task', 'list', search],
		queryFn: async () => {
			const { data } = await http.get('/tasks');

			const tasks: Task[] = (data.tasks || [])
				.map(taskScheme.parse)
				.filter((task: Task) => task.title.toLowerCase().includes(search.toLowerCase()));

			return { tasks };
		},
	});

	return { ...data, ...args };
};
