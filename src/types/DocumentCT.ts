
import { prop } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Expose, Transform } from 'class-transformer';
import mongoose from 'mongoose'

@ObjectType()
class DocumentCT {
	@Field()
  @Expose()
	@prop({default:()=>new mongoose.Types.ObjectId()})
  // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
  @Transform((value: any) => {
    if ('value' in value) {
      return value.value instanceof mongoose.Types.ObjectId ? value.value.toHexString() : value.value.toString();
    }
    return 'unknown value';
  })
  public _id: string;

  @Expose()
  public __v: number;
}

export default DocumentCT