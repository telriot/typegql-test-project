import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { RegisterInput } from 'user/interfaces/RegisterInput';
import { UserModel, User } from 'user/interfaces/User';

@Resolver(User)
class RegisterResolver {
	@Mutation(() => User)
	async register(
		@Arg('input') { firstName, lastName, email, password }: RegisterInput
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await UserModel.create({
			firstName,
			lastName,
			email,
			password: hashedPassword
		})
		return user.deserialize();
	}
}

export default RegisterResolver;
