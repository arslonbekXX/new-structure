import React from 'react';
import { Forms, useTask } from '../../modules/task';
import { useParams } from 'react-router-dom';
import { Button, Skeleton } from 'antd';
import New from './new';

interface SingleProps {}

const Single: React.FC<SingleProps> = () => {
	const { taskId } = useParams();
	const { task, isLoading, isFetching } = useTask({ taskId: taskId! });

	if (isLoading || isFetching)
		return (
			<div className="container flex flex-col gap-2 mx-auto">
				<Skeleton active />
			</div>
		);

	return (
		<div className="container flex flex-col gap-2 mx-auto">
			<div className="flex w-full justify-end">
				<New />
			</div>
			<p>
				<b>Title :</b> {task?.title}
			</p>
			<p>
				<b>Description :</b> {task?.description}
			</p>
			<p>
				<b>Status :</b> {task?.status}
			</p>

			<Button.Group>
				<Button>Update</Button>
				<Forms.Delete defaultValues={{ id: taskId! }} />
			</Button.Group>
		</div>
	);
};

export default Single;
