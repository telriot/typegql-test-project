import { Resolver, Mutation, Arg } from 'type-graphql';
import { CreateJobInput } from 'job/interfaces/CreateJobInput';
import { JobModel, Job } from 'job/interfaces/Job';

@Resolver(Job)
class CreateJobResolver {
	@Mutation(() => Job)
	async register(
		@Arg('input') { name, postedBy, companyName }: CreateJobInput
	): Promise<Job> {
		const job = await JobModel.create({
			name,
			postedBy,
			companyName
		});
		return job.deserialize();
	}
}

export default CreateJobResolver;
