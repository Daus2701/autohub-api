import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingItemDto } from './dto/create-booking-item.dto';
import { UpdateBookingItemDto } from './dto/update-booking-item.dto';

@Injectable()
export class BookingItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingItemDto: CreateBookingItemDto) {
    return this.prisma.bookingItem.create({
      data: {
        quantity: createBookingItemDto.quantity,
        subtotal: createBookingItemDto.subtotal,

        booking: {
          connect: {
            id: createBookingItemDto.bookingId,
          },
        },

        service: {
          connect: {
            id: createBookingItemDto.serviceId,
          },
        },
      },

      include: {
        booking: true,
        service: true,
      },
    });
  }

  async findAll() {
    return this.prisma.bookingItem.findMany({
      include: {
        booking: true,
        service: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.bookingItem.findUnique({
      where: {
        id,
      },

      include: {
        booking: true,
        service: true,
      },
    });
  }

  async update(id: string, updateBookingItemDto: UpdateBookingItemDto) {
    return this.prisma.bookingItem.update({
      where: {
        id,
      },

      data: {
        ...(updateBookingItemDto.quantity && {
          quantity: updateBookingItemDto.quantity,
        }),

        ...(updateBookingItemDto.subtotal && {
          subtotal: updateBookingItemDto.subtotal,
        }),
      },

      include: {
        booking: true,
        service: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.bookingItem.delete({
      where: {
        id,
      },
    });
  }
}