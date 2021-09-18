import { IsEmail, Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class LoginInput {
	@Field()
	@IsEmail()
	email: string;
	@Field()
  @Length(4, 40, {message:'Must be between 4 and 40 characters'})
	password: string;
}
