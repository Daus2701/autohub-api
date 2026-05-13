import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

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

  async findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: {
        id,
      },

      data: {
        ...(updateBookingDto.bookingDate && {
          bookingDate: new Date(updateBookingDto.bookingDate),
        }),

        ...(updateBookingDto.totalPrice && {
          totalPrice: updateBookingDto.totalPrice,
        }),

        ...(updateBookingDto.status && {
          status: updateBookingDto.status,
        }),

        ...(updateBookingDto.timeSlot && {
          timeSlot: updateBookingDto.timeSlot,
        }),
      },

      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}