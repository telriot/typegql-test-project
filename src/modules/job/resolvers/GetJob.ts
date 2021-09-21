import { Resolver, Query, Arg } from 'type-graphql';
import { Job, JobModel } from 'job/interfaces/Job';

@Resolver(Job)
class GetobResolver {
	@Query(() => Job, { nullable: true })
	async getJob(@Arg('id') id: string) {
		const currentJob = await JobModel.findOne({ _id:id });
		if (!currentJob) return null;
		return currentJob.deserialize();
	}
}

export default GetobResolver;
