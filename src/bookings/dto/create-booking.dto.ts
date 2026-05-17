import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

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

  @ApiProperty({
    example: 'Online Banking',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({
    example: 'PENDING',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({
    example: [
      {
        serviceId: 'service-id-here',
        quantity: 1,
        price: 250,
      },
    ],
  })
  items: {
    serviceId: string;
    quantity: number;
    price: number;
  }[];
}