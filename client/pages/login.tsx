import {
	Button,
	Container,
	Grid,
	LinearProgress,
	TextField
} from '@mui/material';
import { FC } from 'react';
import { Formik, Form } from 'formik';
import { GetServerSideProps } from 'next';
import client from '../apollo-client';
import CurrentUser from 'src/queries/get-current-user';
import { useLoginMutation } from 'src/graphql';
export interface LoginProps {
	className?: string;
}

export interface LoginFormInput {
	email: string;
	password: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	
	const { data } = await client.query({
		query: CurrentUser,
		context:{
			headers:{
				cookie:ctx.req.headers.cookie
			}
		}
	});
	return { props: { user: data.getCurrentUser } };
};
const LoginPage: FC<LoginProps> = () => {

	const [loginFunction] = useLoginMutation();
	return (
		<Container maxWidth='md' sx={{ paddingY: '2rem' }}>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={async (
					values,

					formikHelpers
				) => {
					try {
						await loginFunction({ variables: { loginInput: values } });
						formikHelpers.resetForm();
					} catch (error) {
						console.log(error);
					}
				}}>
				{({ values, handleChange, touched, errors, isSubmitting }) => (
					<Form>
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
