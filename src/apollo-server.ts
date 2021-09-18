import { ApolloServer } from 'apollo-server-express';
import { Request } from 'express';
import { buildSchema } from 'type-graphql';
import RegisterResolver from 'user/resolvers/Register';
import GetUsersResolver from 'user/resolvers/GetUsers';
import LoginResolver from 'user/resolvers/Login';
import GetCurrentUserResolver from 'user/resolvers/GetCurrentUser';
import verifyJwtSession from 'utils/verify-jwt-session';

export const buildApolloServer = async (): Promise<ApolloServer> => {
	const schema = await buildSchema({
		resolvers: [
			RegisterResolver,
			GetUsersResolver,
			LoginResolver,
			GetCurrentUserResolver
		],
		authChecker: ({ context: { req } }) => {
			return !!verifyJwtSession(req).id;
		}
	});
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req }: { req: Request }) => ({ req })
	});
	return apolloServer;
};
