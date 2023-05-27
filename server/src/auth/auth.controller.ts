import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() newUser: RegisterUserDto) {
        return this.authService.register(newUser);
    }

    @Post('login')
    async login(@Body() credentials: LoginUserDto, @Res() response: Response) {
        const data = await this.authService.login(credentials);
        response.cookie('refreshToken', data.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        delete data.refreshToken;
        response.json(data);
    }

    @Post('refresh')
    async refresh(@Req() request: Request, @Res() response: Response) {
        const { refreshToken } = request.cookies;
        const data = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', data.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        delete data.refreshToken;
        response.json(data);
    }

    @Post('logout')
    async logout(@Req() request: Request, @Res() response: Response) {
        const { refreshToken } = request.cookies;
        const data = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        response.json(data);
    }
}
