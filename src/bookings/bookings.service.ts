import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        bookingDate: new Date(createBookingDto.bookingDate),
        totalPrice: createBookingDto.totalPrice,
        status: createBookingDto.status,
        timeSlot: createBookingDto.timeSlot,

        user: {
          connect: {
            id: createBookingDto.userId,
          },
        },

        vehicle: {
          connect: {
            id: createBookingDto.vehicleId,
          },
        },
      },

      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async findAll() {
     return this.prisma.booking.findMany({
         include: {
             user: true,
             vehicle: true,
            },
        });
    }
    
}