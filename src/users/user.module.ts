import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { RabbitMQModule } from '../rabbitMQ/rabbitmq.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RabbitMQModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})

export class UsersModule { }
