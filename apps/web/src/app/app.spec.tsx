import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

function renderApp() {
	const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	render(
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</MantineProvider>,
	);
}

describe('App', () => {
	beforeEach(() => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ ok: true, json: async () => ({ message: 'Hello API' }) }),
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('should have a greeting as the title', () => {
		renderApp();
		expect(screen.getByRole('heading', { name: 'Welcome to pyng' })).toBeTruthy();
	});

	it('shows the message from the API', async () => {
		renderApp();
		expect(await screen.findByText('API says: Hello API')).toBeTruthy();
	});
});
