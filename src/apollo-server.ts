import { ApolloServer } from 'apollo-server-express';
import { Request } from 'express';
import { buildSchema } from 'type-graphql';
import RegisterResolver from 'user/resolvers/Register';
import GetUsersResolver from 'user/resolvers/GetUsers';
import LoginResolver from 'user/resolvers/Login';

export const buildApolloServer = async () : Promise<ApolloServer> => {
	const schema = await buildSchema({
		resolvers: [RegisterResolver, GetUsersResolver, LoginResolver]
	});
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req }: {req:Request}) => ({ req })
	});
	return apolloServer;
};
