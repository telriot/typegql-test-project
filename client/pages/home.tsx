import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBarLayout } from 'src/layouts/AppBarLayout';
import { User } from 'src/graphql';
import getIsAuth from 'src/utils/getIsAuth'
import authRedirect from 'src/utils/authRedirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const authUser = await getIsAuth(ctx)
	if(!authUser) return authRedirect(ctx)
	return { props: { authUser } };
};
export interface HomeProps {
	authUser: User;
}

const Home: FC<HomeProps> = () => (
	<AppBarLayout isAuth={true}>
		<Container maxWidth='sm'>
			<Box sx={{ my: 4 }}>
				<Typography variant='h4' component='h1' gutterBottom>
					Some restricted content
				</Typography>
			</Box>
		</Container>
	</AppBarLayout>
);

export default Home;
