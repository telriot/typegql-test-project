import client from 'apollo-client';
import { GetServerSidePropsContext } from 'next';
import { User } from 'src/graphql';
import CurrentUser from 'src/queries/get-current-user';

const getIsAuth = async (ctx: GetServerSidePropsContext): Promise<User> => {
	const res = await client.query({
		query: CurrentUser,
		fetchPolicy: 'no-cache',
		context: {
			headers: {
				cookie: ctx.req.headers.cookie
			}
		}
	});
	return res.data.getCurrentUser;
};

export default getIsAuth;
