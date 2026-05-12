import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;
}