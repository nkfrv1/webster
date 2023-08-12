import { Controller, Post, Body, Res, Req, Param } from '@nestjs/common';
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
import { PasswordResetDto } from './dto/reset-password.dto';
import { ConfirmResetDto } from './dto/confirm-reset.dto';

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
        description: `User's tokens have been refreshed`,
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

    @Post('reset-password')
    @ApiCreatedResponse({
        description: 'Password reset link sent to email address',
    })
    @ApiBadRequestResponse({
        description: `User with given email doesn't exist`,
    })
    async resetPassword(@Body() credentials: PasswordResetDto) {
        return this.authService.resetPassword(credentials.email);
    }

    @Post('reset-password/:token')
    @ApiCreatedResponse({
        description: 'Password has been changed',
    })
    @ApiBadRequestResponse({
        description: `Provided token doesn't match the sent token`,
    })
    async confirmReset(
        @Param('token') token: string,
        @Body() credentials: ConfirmResetDto,
    ) {
        return this.authService.confirmReset(token, credentials.password);
    }
}
