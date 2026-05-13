import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';

@Injectable()
export class ServiceCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceCategoryDto: CreateServiceCategoryDto) {
    return this.prisma.serviceCategory.create({
      data: createServiceCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.serviceCategory.findMany({
      include: {
        services: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.serviceCategory.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });
  }

  async update(
    id: string,
    updateServiceCategoryDto: UpdateServiceCategoryDto,
  ) {
    return this.prisma.serviceCategory.update({
      where: { id },
      data: updateServiceCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.serviceCategory.delete({
      where: { id },
    });
  }
}