import { IsAlpha, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
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

    @IsNotEmpty()
    password: string;
}
