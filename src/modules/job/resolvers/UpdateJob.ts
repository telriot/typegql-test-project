import { Resolver, Mutation, Arg } from 'type-graphql';
import { JobModel, Job } from 'job/interfaces/Job';
@Resolver(Job)
class UpdateJobResolver {
	@Mutation(() => Job)
	async updateJob(
		@Arg('id') id: string,
		@Arg('name') name: string,
		@Arg('companyName') companyName: string
	): Promise<Job | null> {
		let update: Record<string, string> = {};
		if (name) update.name = name;
		if (companyName) update.companyName = companyName;
		const job = await JobModel.findByIdAndUpdate(id, update, { new: true });
		return job;
	}
}

export default UpdateJobResolver;
