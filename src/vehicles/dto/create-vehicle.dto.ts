import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @IsInt()
  mileage: number;

  @IsInt()
  year: number;
}