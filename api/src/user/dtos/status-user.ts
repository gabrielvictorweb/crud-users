/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StatusUserDto {
  @ApiProperty({ default: false })
  @IsNotEmpty()
  status: boolean;
}
