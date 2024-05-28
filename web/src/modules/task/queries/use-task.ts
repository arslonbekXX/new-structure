import { useQuery } from '@tanstack/react-query';
import { Task, taskScheme } from '../schema';
import { http } from '../../../service';

interface Query {
	task: Task | null;
}

interface Params {
	taskId: Task['id'];
}

export const useTask = ({ taskId }: Params) => {
	const initialData: Query = { task: null };

	const { data = initialData, ...args } = useQuery<Query>({
		queryKey: ['task', 'single', taskId],
		queryFn: async () => {
			const { data } = await http.get(`/tasks/${taskId}`);

			const task = taskScheme.parse(data.task);

			return { task };
		},
		enabled: !!taskId,
	});

	return { ...data, ...args };
};
