import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class AuthPostDto {
  @ApiProperty({ default: 'john@doe.com' })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({ default: '12345678' })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;
}
