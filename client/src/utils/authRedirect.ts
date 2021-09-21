import { Redirect, GetServerSidePropsContext } from 'next';

const UNPROTECTED_ROUTES = ['/login', '/signup', '/'];
export type RedirectObject = { redirect: Redirect };

const authRedirect = (ctx: GetServerSidePropsContext): RedirectObject => {
	const getRedirect = (route: string): RedirectObject => ({
		redirect: {
			destination: route,
			permanent: false
		}
	});
	if (UNPROTECTED_ROUTES.includes(ctx.resolvedUrl)) {
		return getRedirect('/home');
	}
	return getRedirect('/login');
};

export default authRedirect;
