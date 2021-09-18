import { gql } from '@apollo/client';

export default gql`
	query GetCurrentUser {
		getCurrentUser {
			_id
			firstName
			lastName
		}
	}
`;
