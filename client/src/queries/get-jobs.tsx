import { gql } from '@apollo/client';

export default gql`
	query GetJobs(
		$getJobsSkip: Int
		$getJobsTake: Int
		$getJobsName: String
		$getJobsPostedBy: String
	) {
		getJobs(
			skip: $getJobsSkip
			take: $getJobsTake
			name: $getJobsName
			postedBy: $getJobsPostedBy
		) {
			_id
			name
			postedBy
			companyName
		}
	}
`;
