import { gql } from '@apollo/client';

export default gql`
	mutation CreateJob($createJobInput: CreateJobInput!) {
		createJob(input: $createJobInput) {
			_id
			name
			postedBy
			companyName
		}
	}
`;
