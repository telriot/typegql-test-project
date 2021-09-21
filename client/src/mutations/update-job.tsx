import { gql } from '@apollo/client';

export default gql`
	mutation UpdateJob(
		$updateJobCompanyName: String!
		$updateJobName: String!
		$updateJobId: String!
	) {
		updateJob(
			companyName: $updateJobCompanyName
			name: $updateJobName
			id: $updateJobId
		) {
			_id
			postedBy
			name
			companyName
		}
	}
`;
