import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({
    example: 'PAID',
  })
  @IsString()
  paymentStatus: string;
}