import {
	prop,
	getModelForClass,
	DocumentType,
	plugin
} from '@typegoose/typegoose';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ObjectType, Field } from 'type-graphql';
import { Exclude, Expose } from 'class-transformer';
import DocumentCT from 'types/DocumentCT';
import { plainToClass } from 'class-transformer';

type PaginateMethod<T> = (
	query?: FilterQuery<T>,
	options?: PaginateOptions,
	callback?: (err: any, result: PaginateResult<T>) => void
) => Promise<PaginateResult<T>>;

@plugin(mongoosePaginate)
@Exclude()
@ObjectType()
export class Job extends DocumentCT {
	@Field()
	@Expose()
	@prop({ required: true })
	public name!: string;

	@Field()
	@Expose()
	@prop({ required: true })
	public postedBy!: string;

	@Field()
	@Expose()
	@prop({ required: true })
	public companyName!: string;

	public deserialize(this: DocumentType<Job>): Job {
		return plainToClass(Job, this);
	}
	static paginate: PaginateMethod<Job>;
}

export const JobModel = getModelForClass(Job);
