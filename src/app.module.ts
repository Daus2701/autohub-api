import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ServicesModule } from './services/services.module';
import { BookingsService } from './bookings/bookings.service';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ServicesModule, BookingsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, BookingsService],
})
export class AppModule {}
