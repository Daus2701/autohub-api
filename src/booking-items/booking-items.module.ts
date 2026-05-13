import { Module } from '@nestjs/common';
import { BookingItemsController } from './booking-items.controller';
import { BookingItemsService } from './booking-items.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookingItemsController],
  providers: [BookingItemsService],
})
export class BookingItemsModule {}