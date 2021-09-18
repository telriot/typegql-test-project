import { IsEmail, Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsEmailAlreadyExist } from 'validation';

@InputType()
export class RegisterInput {
	@Field()
	@Length(1, 30)
	firstName: string;
	@Field()
	@Length(1, 30)
	lastName: string;
	@Field()
	@IsEmail()
	@IsEmailAlreadyExist({ message: 'Email already in use' })
	email: string;
	@Field()
	@Length(4, 40, {message:'Must be between 4 and 40 characters'})
	password: string;
}
