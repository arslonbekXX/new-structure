import { Button, Input, Modal } from 'antd';
import React from 'react';
import { Forms } from '../../modules/task';
import { Controller } from 'react-hook-form';

interface NewProps {}

const New: React.FC<NewProps> = (props) => {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button type="primary" onClick={() => setOpen(true)}>
				New
			</Button>

			<Modal closeIcon={false} footer={false} open={open} onCancel={() => setOpen(false)}>
				<Forms.New>
					{({ control }) => (
						<div className="w-full flex flex-col gap-2">
							<Controller
								control={control}
								name="title"
								render={({ field }) => <Input {...field} placeholder="Title" />}
							/>
							<Controller
								control={control}
								name="description"
								render={({ field }) => <Input {...field} placeholder="Description" />}
							/>
							<Button.Group>
								<Button onClick={() => setOpen(false)}>Cancel</Button>
								<Button htmlType="submit">Submit</Button>
							</Button.Group>
						</div>
					)}
				</Forms.New>
			</Modal>
		</>
	);
};

export default New;
