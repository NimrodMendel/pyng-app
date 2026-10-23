import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const signupSchema = z.object({
	email: z.email('Enter a valid email'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignupValues = z.infer<typeof signupSchema>;

export interface SignupFormProps {
	onSubmit: (values: SignupValues) => void;
	loading?: boolean;
}

export function SignupForm({ onSubmit, loading = false }: SignupFormProps) {
	const form = useForm<SignupValues>({
		mode: 'uncontrolled',
		initialValues: { email: '', password: '' },
		validate: zod4Resolver(signupSchema),
	});

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack maw={360}>
				<TextInput
					label="Email"
					placeholder="you@example.com"
					key={form.key('email')}
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					label="Password"
					key={form.key('password')}
					{...form.getInputProps('password')}
				/>
				<Button type="submit" loading={loading}>
					Sign up
				</Button>
			</Stack>
		</form>
	);
}

export default SignupForm;
