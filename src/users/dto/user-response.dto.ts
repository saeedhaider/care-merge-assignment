export class UserResponseDto {
    userId: number;
    name: string;
    email: string;
    age: number;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
