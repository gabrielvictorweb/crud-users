/* istanbul ignore file */

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

export function isCPF(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isCPF' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return cpf.isValid(value);
  }
}
