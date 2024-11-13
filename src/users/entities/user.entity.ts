import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
// as using migrations, and ORM synchronization flag is false,
//  adding index here will not automatically add them until we create/run migrations


@Index("idx_user_age_name", ["age", "name"]) // Combined index for age & name related queries
@Index("idx_user_age", ["age"]) // Index for age column for age related queries
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    age: number;
}
