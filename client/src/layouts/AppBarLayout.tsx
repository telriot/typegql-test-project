import { FC, ReactNode } from 'react';
import * as React from 'react';
import {
	AppBar,
	Box,
	Container,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLogoutMutation } from 'src/graphql';
import { useRouter } from 'next/router';
import Link from 'src/Link';
export interface AppBarLayoutProps {
	children: ReactNode;
	isAuth: boolean;
}

const MENU_LINKS = [
	{
		label: 'Users',
		href: '/users'
	},
	{
		label: 'Jobs',
		href: '/jobs'
	}
];

export const AppBarLayout: FC<AppBarLayoutProps> = ({ isAuth, children }) => {
	const theme = useTheme();
	const router = useRouter();
	const [logout] = useLogoutMutation();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};
	const handleAuthAction = async () => {
		if (isAuth) {
			await logout();
		}
		router.push('/login');
	};

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
							onClick={handleOpenMenu}>
							<MenuIcon />
						</IconButton>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleCloseMenu}
							MenuListProps={{
								'aria-labelledby': 'basic-button'
							}}>
							{MENU_LINKS.map(({ label, href }) => (
								<MenuItem key={href} onClick={handleCloseMenu}>
									<Link
										href={href}
										sx={{
											textDecoration: 'none',
											color: theme.palette.text.primary
										}}>
										{label}
									</Link>
								</MenuItem>
							))}
						</Menu>
						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							TypeGraphQL - Next - MongoDB Test App
						</Typography>
						<Button onClick={handleAuthAction} color='inherit'>
							{isAuth ? 'Logout' : 'Signup'}
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<Container maxWidth='lg' sx={{ padding: '2rem 0' }}>
				{children}
			</Container>
		</>
	);
};
