import {
    IsAlpha,
    IsNotEmpty,
    IsOptional,
    IsEmail,
    MinLength,
} from 'class-validator';

export class RegisterUserDto {
    @IsAlpha()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsAlpha()
    @IsNotEmpty()
    surname?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6, { message: 'password must be at least 6 characters long' })
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmation: string;
}
