/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';
import { isCPF } from '../../decorators/is-cpf';
import { removeNonDigits } from '../../utils/string';

export class CreateUserDto {
  @ApiProperty({ default: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: '05606578034' })
  @isCPF({ message: 'CPF document is not valid.' })
  @Transform(({ value }) => removeNonDigits(value))
  cpf: string;

  @ApiProperty({ default: 'john@doe.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '11912341234' })
  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  @Transform(({ value }) => removeNonDigits(value))
  phoneNumber: string;

  @ApiProperty({ default: '12345678' })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @ApiProperty({ default: '12/12/2012' })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  birthday: Date;

  @ApiProperty({
    default:
      'Avenida Alameda das Travessas, nº 111, Edifício Bosque do Cerrado, apartamento 2222 - Bairro dos Barris. CEP: 40000-000. Salvador - Bahia.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  address: string;

  @ApiProperty({ default: 'USER', enum: ['ADMIN', 'USER'] })
  @IsNotEmpty()
  role: Role;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
