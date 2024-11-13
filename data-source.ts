/**
 * This file is data source for typeORm, it tells typeORM about DB connection, 
 * and all entities that it needs to mapp from corresponding DB tables
 */
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'saeed',
    password: 'saeed',
    database: 'user_db',
    entities: [User], // Add as many entities needed here so that ORM gived as equivlent mapping functions to use
    migrations: ['dist/migrations/*.js'], // point to dist as dist contains compiled ts->js files to avoid syntax errprs
    synchronize: false,
});
