import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from "class-validator";

@ArgsType()
class GetJobArgs {
	@Field(() => Int, { defaultValue: 0 })
  @Min(0)
	skip?: number;

	@Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(50)
	take?:number;

	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	postedBy?: string;
  

}

export default GetJobArgs;
