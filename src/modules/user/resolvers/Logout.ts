import { Resolver, Mutation, Ctx } from 'type-graphql';
import { User } from 'user/interfaces/User';
import MyContext from 'types/MyContext';
import { AUTH_COOKIE } from 'config';

@Resolver(User)
class LogoutResolver {
	@Mutation(()=> Boolean)
	async logout(@Ctx() ctx: MyContext): Promise<boolean> {
		try {
			ctx.req.session=null
      ctx.res.clearCookie(AUTH_COOKIE)
			return true;
		} catch (error) {
			console.warn(error);
			return false;
		}
	}
}

export default LogoutResolver;
