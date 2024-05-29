import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { http } from '../../../service';
import { Task, taskScheme } from '../schema';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DeleteForm, deleteSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface DeleteProps {
	defaultValues: DeleteForm;
}

const Delete: React.FC<DeleteProps> = ({ defaultValues }) => {
	const navigate = useNavigate();

	const form = useForm<DeleteForm>({ resolver: zodResolver(deleteSchema), defaultValues });

	const mutation = useMutation<Task, any, DeleteForm>({
		mutationFn: async ({ id }) => {
			const { data } = await http.delete(`/tasks/${id}`);
			const task = taskScheme.parse(data.task);

			return task;
		},
		onSuccess: async (_, { id }) => {
			message.success(`Tabriklaymiz vazifa ochirildi, ${id}`);
			navigate('/tasks');
		},
	});

	const onSubmit = async (values: DeleteForm) => {
		await new Promise((onSettled) => mutation.mutate(values, { onSettled }));
	};

	return (
		<Button
			type="primary"
			danger
			loading={form.formState.isSubmitting}
			disabled={form.formState.isSubmitting}
			onClick={(e) => {
				e.stopPropagation();
				form.handleSubmit(onSubmit)(e);
			}}
		>
			Delete
		</Button>
	);
};

export default Delete;
