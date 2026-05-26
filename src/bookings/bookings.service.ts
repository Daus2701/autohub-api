import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';


@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        bookingDate: new Date(createBookingDto.bookingDate),
        timeSlot: createBookingDto.timeSlot,
      },
    });

    if (existingBooking) {
      throw new BadRequestException(
        'This time slot is already booked',
      );
    }

    return this.prisma.booking.create({
      data: {
        bookingDate: new Date(createBookingDto.bookingDate),
        totalPrice: createBookingDto.totalPrice,
        status: createBookingDto.status,
        timeSlot: createBookingDto.timeSlot,
        paymentStatus: createBookingDto.paymentStatus,
        paymentMethod: createBookingDto.paymentMethod,

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

        bookingItems: {
          create: createBookingDto.items.map((item) => ({
            quantity: item.quantity,
            subtotal: item.price * item.quantity,

            service: {
              connect: {
                id: item.serviceId,
              },
            },
          })),
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
        bookingItems: {
          include: {
            service: true,
          },
        },
      },
    });
  }

  async getDashboardSummary() {
    const totalBookings = await this.prisma.booking.count();

    const completedBookings = await this.prisma.booking.count({
      where: {
        status: 'Completed',
      },
    });

    const pendingBookings = await this.prisma.booking.count({
      where: {
        status: 'Pending',
      },
    });

    const confirmedBookings = await this.prisma.booking.count({
      where: {
        status: 'In Progress',
      },
    });

    const revenue = await this.prisma.booking.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        paymentStatus: 'PAID',
      },
    });

    return {
      totalBookings,
      completedBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue: revenue._sum.totalPrice || 0,
    };
  }

  async getAvailableSlots(date: string) {
    const allSlots = [
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '1:00 PM',
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
    ];

    const selectedDate = new Date(date);

    const bookings = await this.prisma.booking.findMany({
      where: {
        bookingDate: selectedDate,
      },
    });

    const bookedSlots = [...new Set(
      bookings.map((booking) => booking.timeSlot),
    )];

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    return {
      selectedDate,
      bookedSlots,
      availableSlots,
    };
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

        ...(updateBookingDto.mechanic && {
          mechanic: updateBookingDto.mechanic || null,
        }),

        ...(updateBookingDto.paymentStatus && {
          paymentStatus: updateBookingDto.paymentStatus,
        }),

        ...(updateBookingDto.paymentMethod && {
          paymentMethod: updateBookingDto.paymentMethod,
        }),
      },

      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async getBookedSlots(date: string) {

    const bookings = await this.prisma.booking.findMany({
      where: {
        bookingDate: {
          gte: new Date(`${date}T00:00:00.000Z`),
          lte: new Date(`${date}T23:59:59.999Z`),
        },
      },
      select: {
        timeSlot: true,
      },
    });

    return bookings.map((booking) => booking.timeSlot);
  }

  async getUserBookings(userId: string) {

    return this.prisma.booking.findMany({

        where: {
            userId,
        },

        include: {
            bookingItems: {
                include: {
                    service: true,
                },
            },

            vehicle: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });
  }

  async updatePayment(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.prisma.booking.update({
      where: {
        id,
      },

      data: {
        paymentStatus: updatePaymentDto.paymentStatus,

        status:
          updatePaymentDto.paymentStatus === 'PAID'
            ? 'CONFIRMED'
            : 'PENDING',
      },

      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async updateStatus(
    id: string,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    return this.prisma.booking.update({
      where: {
        id,
      },

      data: {
        status: updateBookingStatusDto.status,
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