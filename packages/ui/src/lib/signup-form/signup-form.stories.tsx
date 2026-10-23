import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SignupForm } from './signup-form';

const meta = {
	component: SignupForm,
	title: 'Forms/SignupForm',
	args: { onSubmit: fn() },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	args: { loading: true },
};
