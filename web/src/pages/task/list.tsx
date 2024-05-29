import { Button, Input, Table, Tag } from 'antd';
import React from 'react';
import { useTasks } from '../../modules/task';
import { useNavigate } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import New from './new';

const List: React.FC = () => {
	const navigate = useNavigate();
	const [{ page, search }, setParams] = useQueryParams({
		search: withDefault(StringParam, ''),
		page: withDefault(NumberParam, 1),
	});
	const { tasks, isLoading, isFetching } = useTasks({ search: search! });

	return (
		<div className="flex flex-col gap-2 container mx-auto">
			<p className="font-bold">Tasks List</p>
			<div className="flex w-full justify-between">
				<Input
					value={search || ''}
					onChange={(e) => setParams({ search: e.target.value, page: 1 })}
					placeholder="Search"
					className="w-[400px]"
				/>
				<New />
			</div>
			<Table
				dataSource={tasks}
				rowKey="id"
				loading={isLoading || isFetching}
				rowClassName="cursor-pointer"
				onRow={(record) => ({ onClick: () => navigate(`/tasks/${record.id}`) })}
				pagination={{ current: page, onChange: (page) => setParams({ page }) }}
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
