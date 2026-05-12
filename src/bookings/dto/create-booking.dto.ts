import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString, } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: 'user-id-here',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'vehicle-id-here',
  })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
    example: '2026-05-20T10:00:00.000Z',
  })
  @IsDateString()
  bookingDate: string;

  @ApiProperty({
    example: 450,
  })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({
    example: 'Pending',
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: '10:00 AM',
  })
  @IsString()
  timeSlot: string;
}