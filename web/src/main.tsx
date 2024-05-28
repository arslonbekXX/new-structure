import ReactDOM from 'react-dom/client';
import Routes from './routes';
import './tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { message } from 'antd';
import { ZodError } from 'zod';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';

const client = new QueryClient({
	defaultOptions: {
		queries: { refetchOnWindowFocus: false, retry: false },
		mutations: { retry: false },
	},
	queryCache: new QueryCache({
		onError: (error, query) => {
			if (error instanceof AxiosError) {
				message.error(error.response?.data?.message);
			}

			if (error instanceof ZodError) {
				console.error(error.message);
			}
			// 🎉 only show error toasts if we already have data in the cache
			// which indicates a failed background update
			if (query.state.data !== undefined) {
				message.error(`Something went wrong: ${error.message}`);
			}
		},
	}),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={client}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
);

/**
 * --------- Plans ---------
 * ✅ zod schema
 *
 *
 */
