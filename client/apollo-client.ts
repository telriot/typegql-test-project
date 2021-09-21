import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
const isServer = typeof window === 'undefined';

const link = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include'
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				// Merge job results in infinite scrolling, rebuild when keyargs change
				getJobs: {
					keyArgs: ['name', 'postedBy'],
					merge(
						existing,
						incoming,
					) {
						// Slicing is necessary because the existing data is
						// immutable, and frozen in development.
						const merged = existing ? existing.slice(0) : [];
						incoming.forEach((job: any) => {
							if (existing?.find((el: any) => el.__ref === job.__ref)) return;
							merged.push(job);
						});
						return merged;
					}
				}
			}
		}
	}
});
const client = new ApolloClient({
	cache,
	link,
	ssrMode: isServer
});

export default client;
