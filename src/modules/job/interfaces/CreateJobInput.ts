import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateJobInput {
	@Field()
	@Length(4, 40, { message: 'Must be between 4 and 40 characters' })
	name: string;
	@Field()
	@Length(4, 40, { message: 'Must be between 4 and 40 characters' })
	companyName: string;
	@Field()
	//TODO: Could write an object id validator
	postedBy: string;
}
