import { Button, Table, Tag } from 'antd';
import React from 'react';
import { Task, useTasks } from '../../modules/task';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';

interface ListProps {}

const List: React.FC<ListProps> = (props) => {
	const { tasks, isLoading, isFetching } = useTasks();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-2 container mx-auto">
			<p className="font-bold">Tasks List</p>
			<Table
				pagination={false}
				dataSource={tasks}
				rowKey="id"
				loading={isLoading || isFetching}
				rowClassName="cursor-pointer"
				onRow={(record) => ({ onClick: () => navigate(`/tasks/${record.id}`) })}
				columns={[
					{
						dataIndex: 'id',
						title: '# ID',
					},
					{
						dataIndex: 'title',
						title: 'Title',
					},
					{
						dataIndex: 'description',
						title: 'Description',
					},
					{
						dataIndex: 'status',
						title: 'Status',
						render: (status, record) => <Tag>{record.status}</Tag>,
					},
					{
						dataIndex: '',
						title: 'Actions',
						render: () => (
							<Button.Group>
								<Button>Edit</Button>
								<Button type="primary" danger>
									Delete
								</Button>
								<Button>Update</Button>
							</Button.Group>
						),
					},
				]}
			/>
		</div>
	);
};

export default List;
