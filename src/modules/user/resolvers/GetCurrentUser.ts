import { NotAuthorizedError } from 'errors/not-authorized-error';
import { Resolver, Query, Ctx } from 'type-graphql';
import MyContext from 'types/MyContext';
import { User, UserModel } from 'user/interfaces/User';
import verifyJwtSession from 'utils/verify-jwt-session';

@Resolver(User)
class GetCurrentUserResolver {
	@Query(() => User, { nullable: true })
	async getCurrentUser(@Ctx() {req}: MyContext): Promise<User | null> {
		try {
			const { id } = verifyJwtSession(req);
			const currentUser = await UserModel.findOne({ id });
			if (!currentUser) throw new NotAuthorizedError();
			return currentUser.deserialize();
		} catch (err) {
			console.error(err);
		}
		return null;
	}
}

export default GetCurrentUserResolver;
