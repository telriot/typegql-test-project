import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Typography from '@mui/material/Typography';
import Link from '../src/Link';
import { AppBarLayout } from 'src/layouts/AppBarLayout';
import getIsAuth from 'src/utils/getIsAuth';
import authRedirect from 'src/utils/authRedirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const currentUser = await getIsAuth(ctx);
	if (currentUser) return authRedirect(ctx);
	return { props: {} };
};

export const Index: FC = () => (
	<AppBarLayout isAuth={false}>
		<Typography variant='h4' component='h1' gutterBottom>
			Next.js v5-beta with TypeScript example
		</Typography>
		<Link href='/about' color='secondary'>
			Go to the about page
		</Link>
	</AppBarLayout>
);
export default Index;
