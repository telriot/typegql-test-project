import { Resolver, Query, Authorized } from 'type-graphql';
import { UserModel, User } from 'user/interfaces/User';

@Resolver(User)
class GetUsersResolver {
	@Authorized()
	@Query(() => [User])
	async getUsers(): Promise<User[]> {
		const users = await UserModel.find();
		return users.map(user=>user.deserialize());
	}
}

export default GetUsersResolver;
