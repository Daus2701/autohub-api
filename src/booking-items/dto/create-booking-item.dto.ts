import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingItemDto {
  @IsString()
  @IsNotEmpty()
  bookingId: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsInt()
  quantity: number;

  @IsInt()
  subtotal: number;
}