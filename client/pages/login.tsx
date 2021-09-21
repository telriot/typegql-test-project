import {
	Button,
	Container,
	Grid,
	LinearProgress,
	TextField,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { Formik, Form } from 'formik';
import { GetServerSideProps } from 'next';
import { useLoginMutation } from 'src/graphql';
import { useRouter } from 'next/router';
import getIsAuth from 'src/utils/getIsAuth'
import authRedirect from 'src/utils/authRedirect';

export interface LoginProps {
	className?: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const currentUser = await getIsAuth(ctx)
	if(currentUser) return authRedirect(ctx)
	return { props: {} };
};

const LoginPage: FC = () => {
	const [login] = useLoginMutation();
	const router = useRouter()

	return (
		<Container maxWidth='md' sx={{ paddingY: '2rem' }}>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={async (values, formikHelpers) => {
					try {
						await login({
							variables: { loginInput: values }
						});
						router.push('/home')
						formikHelpers.resetForm();
					} catch (error) {
						console.log(error);
					}
				}}>
				{({ values, handleChange, touched, errors, isSubmitting }) => (
					<Form>
						<Typography variant='h3' sx={{ marginBottom: '2rem' }}>
							Login
						</Typography>
						<Grid container>
							<Grid item xs={12} style={{ marginBottom: '2rem' }}>
								<TextField
									fullWidth
									label='email'
									name='email'
									value={values.email}
									onChange={handleChange}
									error={touched.email && Boolean(errors.email)}
									helperText={touched.email && errors.email}
								/>{' '}
							</Grid>
							<Grid item xs={12} style={{ marginBottom: '2rem' }}>
								<TextField
									fullWidth
									label='password'
									name='password'
									value={values.password}
									onChange={handleChange}
									error={touched.password && Boolean(errors.password)}
									helperText={touched.password && errors.password}
								/>
							</Grid>

							{isSubmitting && <LinearProgress />}
							<Button
								disabled={isSubmitting}
								color='primary'
								variant='contained'
								type='submit'
								fullWidth>
								Submit
							</Button>
						</Grid>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default LoginPage;
