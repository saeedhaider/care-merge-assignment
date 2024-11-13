import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RabbitMQService } from 'src/rabbitMQ/rabbitmq.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';


@Injectable() // Injectable decorator to make it injectable as dependency in other files where needed, for example controller
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>, // Equivalent mapped function by ORM on User table
        private readonly rabbitMQService: RabbitMQService // RabitMQ service reference 
    ) { }

    async create(user: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });

        // Throw an HttpException if user already exists
        if (existingUser) {
            throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
        }


        const newUser = await this.usersRepository.save(user);

        // Call RabbitMQService to send a welcome message after user creation
        await this.rabbitMQService.sendWelcomeMessage(newUser.name);

        return newUser;
        // return this.usersRepository.save(user);
    }

    findAll(): Promise<UserResponseDto[]> {
        return this.usersRepository.find();
    }
}
