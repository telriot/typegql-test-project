import { FC } from 'react';
import { GetServerSideProps } from 'next';
import getUsers from 'src/queries/get-users';
import { User } from 'src/graphql';
import { AppBarLayout } from 'src/layouts/AppBarLayout';
import getIsAuth from 'src/utils/getIsAuth';
import authRedirect from 'src/utils/authRedirect';
import authQuery from 'src/utils/authQuery';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const user = await getIsAuth(ctx);
	if (!user) return authRedirect(ctx);
	try {
		const { data } = await authQuery(ctx, getUsers);
		return { props: { users: data.getUsers } };
	} catch (error) {
		console.log((error as Error).message);
		return { props: { users: [] } };
	}
};
export interface UsersPageProps {
	users: User[];
}
const UsersPage: FC<UsersPageProps> = ({ users }) => {
	console.log(users)
	return (
		<AppBarLayout isAuth={true}>
			<Typography variant='h3' sx={{marginBottom:'2rem'}}>Subscribed Users</Typography>
			<List>
				{users.map((user) => (
					<ListItem disablePadding key={user._id}>
						<ListItemButton>
							<ListItemIcon></ListItemIcon>
							<ListItemText
								primary={`${user.firstName} ${user.lastName}`}
								secondary={user._id}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</AppBarLayout>
	);
};

export default UsersPage;
