import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        name: createServiceDto.name,
        description: createServiceDto.description,
        price: createServiceDto.price,

        category: {
          connect: {
            id: createServiceDto.categoryId,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.service.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: {
        id,
      },

      include: {
        category: true,
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
        return this.prisma.service.update({
            where: {
                id,
            },

            data: {
                ...(updateServiceDto.name && {
                    name: updateServiceDto.name,
                }),

                ...(updateServiceDto.description && {
                    description: updateServiceDto.description,
                }),

                ...(updateServiceDto.price && {
                    price: updateServiceDto.price,
                }),

                ...(updateServiceDto.categoryId && {
                    category: {
                        connect: {
                            id: updateServiceDto.categoryId,
                        },
                    },
                }),
            },

            include: {
                category: true,
            },
        });
    }

   async remove(id: string) {
        return this.prisma.service.delete({
            where: {
                id,
            },
        });
    } 
}