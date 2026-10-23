import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SignupForm } from './signup-form';

function renderForm(onSubmit = vi.fn()) {
	render(
		<MantineProvider>
			<SignupForm onSubmit={onSubmit} />
		</MantineProvider>,
	);
	return onSubmit;
}

describe('SignupForm', () => {
	it('shows validation errors and does not submit invalid values', async () => {
		const onSubmit = renderForm();

		fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(await screen.findByText('Enter a valid email')).toBeTruthy();
		expect(screen.getByText('Password must be at least 8 characters')).toBeTruthy();
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it('submits valid values', async () => {
		const onSubmit = renderForm();

		fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.co' } });
		fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secret123' } });
		fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith(
				{ email: 'a@b.co', password: 'secret123' },
				expect.anything(),
			),
		);
	});
});
