import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        brand: createVehicleDto.brand,
        model: createVehicleDto.model,
        plateNumber: createVehicleDto.plateNumber,
        mileage: createVehicleDto.mileage,
        year: createVehicleDto.year,

        user: {
          connect: {
            id: createVehicleDto.userId,
          },
        },
      },

      include: {
        user: true,
      },
    });
  }

  async findAll() {
    return this.prisma.vehicle.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.vehicle.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
      },
    });
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: {
        id,
      },

      data: {
        ...(updateVehicleDto.brand && {
          brand: updateVehicleDto.brand,
        }),

        ...(updateVehicleDto.model && {
          model: updateVehicleDto.model,
        }),

        ...(updateVehicleDto.plateNumber && {
          plateNumber: updateVehicleDto.plateNumber,
        }),

        ...(updateVehicleDto.mileage && {
          mileage: updateVehicleDto.mileage,
        }),

        ...(updateVehicleDto.year && {
          year: updateVehicleDto.year,
        }),
      },

      include: {
        user: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.vehicle.delete({
      where: {
        id,
      },
    });
  }
}