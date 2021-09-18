import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Exclude, Expose } from 'class-transformer';
import DocumentCT from 'types/DocumentCT';
import { plainToClass } from 'class-transformer';

@Exclude()
@ObjectType()
export class User extends DocumentCT {
	@Field()
	@Expose()
	@prop({ required: true })
	public firstName!: string;

	@Field()
	@Expose()
	@prop({ required: true })
	public lastName!: string;

	@Field()
	@Expose()
	@prop({ required: true })
	public email!: string;

	@Field({ nullable: true })
	@prop({ required: true })
	public password!: string;

	public deserialize(this: DocumentType<User>): User {
		return plainToClass(User, this);
	}
}

export const UserModel = getModelForClass(User);
