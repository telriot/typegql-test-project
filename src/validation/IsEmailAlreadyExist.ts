import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';
import { UserModel } from 'user/interfaces/User';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
	implements ValidatorConstraintInterface
{
	validate(email: string): Promise<boolean> {
		return UserModel.findOne({ email }).then((user) => !user);
	}
}

export function IsEmailAlreadyExist(
	validationOptions?: ValidationOptions
): (object: Record<string, any>, propertyName: string) => void {
	return function (object: Record<string, any>, propertyName: string): void {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsEmailAlreadyExistConstraint
		});
	};
}
