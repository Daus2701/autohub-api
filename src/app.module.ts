import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ServicesModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
