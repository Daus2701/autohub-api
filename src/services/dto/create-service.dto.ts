import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    example: 'Oil Change',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Engine oil replacement',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 150,
  })
  @IsNumber()
  price: number;
}