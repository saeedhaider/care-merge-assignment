import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
    // Import UserService file which contains business logic as dependency injection
    constructor(private readonly usersService: UsersService) { }

    // Method for creating a use entity in DB
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    // Method for fetching all users from DB
    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.findAll();
    }
}

