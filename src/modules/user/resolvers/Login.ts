import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserModel, User } from 'user/interfaces/User';
import { BadRequestError } from 'errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import MyContext from 'types/MyContext';
import { LoginInput } from '../interfaces/LoginInput';

@Resolver(User)
class LoginResolver {
	@Mutation(() => User)
	async login(
		@Arg('input') { email, password }: LoginInput,
		@Ctx() ctx: MyContext
	): Promise<User> {
    if(!process.env.JWT_KEY) throw new Error('JWT_KEY not set')
    const existingUser = await UserModel.findOne({ email });
		if (!existingUser) throw new BadRequestError('Credentials not valid');
		const isMatch = await bcrypt.compare(password, existingUser.password);
		if (!isMatch) throw new BadRequestError('Credentials not valid');
		const userJwt = jwt.sign(
			{ id: existingUser._id, email: existingUser.email },
			process.env.JWT_KEY
		);
		ctx.req.session = {
			jwt: userJwt
		};
		return existingUser.deserialize()
	}
}

export default LoginResolver;
