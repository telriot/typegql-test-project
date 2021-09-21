import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';
import { buildSchema } from 'type-graphql';
import RegisterResolver from 'user/resolvers/Register';
import GetUsersResolver from 'user/resolvers/GetUsers';
import LoginResolver from 'user/resolvers/Login';
import GetCurrentUserResolver from 'user/resolvers/GetCurrentUser';
import LogoutResolver from 'user/resolvers/Logout';
import verifyJwtSession from 'utils/verify-jwt-session';
import CreateJobResolver from 'job/resolvers/CreateJob';
import GetJobResolver from 'job/resolvers/GetJob';
import GetJobsResolver from 'job/resolvers/GetJobs';
import DeleteJobResolver from 'modules/job/resolvers/DeleteJob';
import UpdateJobResolver from 'modules/job/resolvers/UpdateJob';

export const buildApolloServer = async (): Promise<ApolloServer> => {
	const schema = await buildSchema({
		resolvers: [
			RegisterResolver,
			GetUsersResolver,
			DeleteJobResolver,
			LoginResolver,
			LogoutResolver,
			GetCurrentUserResolver,
			CreateJobResolver,
			GetJobResolver,
			GetJobsResolver,
			UpdateJobResolver
		],
		authChecker: ({ context: { req } }) => {
			return !!verifyJwtSession(req)?.id;
		}
	});
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }: { req: Request; res: Response }) => ({ req, res })
	});
	return apolloServer;
};
