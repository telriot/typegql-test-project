import { gql } from '@apollo/client';

export default gql`
	query GetUsers {
		getUsers {
			_id
			firstName
			lastName
			email
		}
	}
`;
