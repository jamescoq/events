import { QueryClient, QueryClientProvider } from 'react-query';
import { createGlobalStyle } from 'styled-components';

import { EventContextProvider } from '../eventsContext';
import Container from './Container';
import EventsForm from './EventsForm';
import EventsTable from './EventsTable';
import Heading from './Heading';
import WeatherForecast from './WeatherForecast';

const GlobalStyle = createGlobalStyle`
	html: {
		height: 100%;
	}
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100%;
	}
`;

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<EventContextProvider>
			<GlobalStyle />
			<Container margin="5vh">
				<Heading as="h2">Správa událostí</Heading>
				<WeatherForecast />
				<EventsForm />
				<EventsTable />
			</Container>
		</EventContextProvider>
	</QueryClientProvider>
);

export default App;
