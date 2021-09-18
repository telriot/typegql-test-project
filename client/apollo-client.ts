import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const isServer = typeof window === 'undefined';

const link = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include'
});
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
	ssrMode: isServer
});

export default client;