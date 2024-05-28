import React from 'react';
import { useTask } from '../../modules/task';
import { useParams } from 'react-router-dom';
import { Button, Skeleton } from 'antd';

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
				<Button>Edit</Button>
				<Button>Delete</Button>
				<Button>Update</Button>
			</Button.Group>
		</div>
	);
};

export default Single;
