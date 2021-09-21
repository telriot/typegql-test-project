import { Resolver, Mutation, Arg } from 'type-graphql';
import { JobModel, Job } from 'job/interfaces/Job';

@Resolver(Job)
class DeleteJobResolver {
	@Mutation(() => Job)
	async deleteJob(@Arg('id') id: string): Promise<Job | null> {
		const job = await JobModel.findByIdAndDelete(id);
		return job || null;
	}
}

export default DeleteJobResolver;
