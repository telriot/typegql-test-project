import {
	Resolver,
	Query,
	// Authorized,
	Args
} from 'type-graphql';
import { JobModel, Job } from 'job/interfaces/Job';
import GetJobArgs from 'job/interfaces/GetJobsArgs';

@Resolver(Job)
class GetJobsResolver {
	// @Authorized()
	@Query(() => [Job])
	async getJobs(
		@Args()
		{ skip, take, postedBy, name }: GetJobArgs
	): Promise<Job[]> {
		const nameRegex = new RegExp(name || '', 'gi');
		const query: Record<string, string | number | RegExp> = {};
		if (name) query['name'] = nameRegex;
		if (postedBy) query['postedBy'] = postedBy;
		const { docs } = await JobModel.paginate(query, {
			offset: skip,
			limit: take
		});
		return docs;
	}
}

export default GetJobsResolver;
