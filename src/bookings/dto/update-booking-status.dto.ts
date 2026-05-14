import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBookingStatusDto {
  @ApiProperty({
    example: 'COMPLETED',
  })
  @IsString()
  status: string;
}