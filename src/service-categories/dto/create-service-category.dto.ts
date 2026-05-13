import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}