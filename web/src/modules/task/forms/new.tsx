import React from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { NewForm, newSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, taskScheme } from '../schema';
import { http } from '../../../service';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface NewProps {
	defaultValues?: Partial<NewForm>;
	children: (form: UseFormReturn<NewForm>) => React.ReactNode;
}

const New: React.FC<NewProps> = ({ defaultValues = {}, children }) => {
	const client = useQueryClient();
	const navigate = useNavigate();
	const form = useForm<NewForm>({
		resolver: zodResolver(newSchema),
		defaultValues: {
			...defaultValues,
			status: 'TODO',
			title: '',
			description: '',
		},
	});

	const mutation = useMutation<{ task: Task }, any, NewForm>({
		mutationFn: async (values) => {
			const { data } = await http.post(`/tasks`, values);
			const task = taskScheme.parse(data.task);

			return { task };
		},
		onSuccess: async () => {
			message.success(`Tabriklaymiz vazifa yaratildi`);
			await client.invalidateQueries({ queryKey: ['task', 'list'] });
			navigate('/tasks');
		},
	});

	const onSubmit = async (values: NewForm) => {
		await new Promise((onSettled) => mutation.mutate(values, { onSettled }));
	};

	return <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>;
};

export default New;
