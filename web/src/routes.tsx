import React from 'react';
import { BrowserRouter, Navigate, Route, Routes as Switch } from 'react-router-dom';
import { Task } from './pages';

const Routes: React.FC = () => (
	<BrowserRouter>
		<Switch>
			<Route path="tasks">
				<Route index element={<Task.List />} />
				<Route path=":taskId" element={<Task.Single />} />
				<Route path="*" element={<Navigate to="/tasks" />} />
			</Route>
			<Route path="*" element={<Navigate to="/tasks" />} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
