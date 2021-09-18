import { Resolver, Query } from 'type-graphql';
import { UserModel, User } from 'user/interfaces/User';

@Resolver(User)
class GetUsersResolver {
	@Query(() => [User])
	async getUsers(): Promise<User[]> {
		const users = await UserModel.find();
		return users.map(user=>user.deserialize());
	}
}

export default GetUsersResolver;
