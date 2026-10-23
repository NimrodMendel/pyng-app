import { Anchor, Container, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { SignupForm } from '@pyng-app/ui';
import { useQuery } from '@tanstack/react-query';
import { Link, Route, Routes } from 'react-router-dom';

async function fetchApiMessage(): Promise<{ message: string }> {
	const res = await fetch('/api');
	if (!res.ok) throw new Error(`API responded with ${res.status}`);
	return res.json();
}

function Home() {
	const { data, isPending, isError } = useQuery({
		queryKey: ['api-message'],
		queryFn: fetchApiMessage,
	});

	return (
		<Stack>
			<Title order={2}>Welcome to pyng</Title>
			{isPending && <Loader size="sm" />}
			{isError && <Text c="red">Could not reach the API</Text>}
			{data && <Text>API says: {data.message}</Text>}
			<SignupForm onSubmit={(values) => console.log('signup', values)} />
		</Stack>
	);
}

export function App() {
	return (
		<Container py="xl">
			<Group mb="lg">
				<Anchor component={Link} to="/">
					Home
				</Anchor>
				<Anchor component={Link} to="/page-2">
					Page 2
				</Anchor>
			</Group>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/page-2" element={<Text>This is page 2.</Text>} />
			</Routes>
		</Container>
	);
}

export default App;
