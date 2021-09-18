import { gql } from '@apollo/client';

export default gql`
	mutation Login($loginInput: LoginInput!) {
		login(input: $loginInput) {
			firstName
			lastName
			email
		}
	}
`;
