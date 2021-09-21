import { gql } from '@apollo/client';

export default gql`
	mutation DeleteJob($deleteJobId: String!) {
		deleteJob(id: $deleteJobId) {
			_id
			name
			postedBy
			companyName
		}
	}
`;
