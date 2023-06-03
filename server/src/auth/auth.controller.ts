import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiCreatedResponse({
        description: 'The user has been registered',
    })
    @ApiBadRequestResponse({
        description: 'User with given email already exists',
    })
    register(@Body() newUser: RegisterUserDto) {
        return this.authService.register(newUser);
    }

    @Post('login')
    @ApiCreatedResponse({
        description: 'The user has been logged in',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials',
    })
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
    @ApiCreatedResponse({
        description: `User's tokens has been refreshed`,
    })
    @ApiUnauthorizedResponse({
        description: `Not found or invalid user's refresh token`,
    })
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
    @ApiCreatedResponse({
        description: 'The user has been logged out',
    })
    @ApiUnauthorizedResponse({
        description: 'Not logged in yet',
    })
    async logout(@Req() request: Request, @Res() response: Response) {
        const { refreshToken } = request.cookies;
        const data = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        response.json(data);
    }
}
