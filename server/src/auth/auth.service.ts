import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    userRequestedReset: { id: string; token: string };

    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokensService,
        private readonly mailService: MailerService,
    ) {}

    async register(newUser: RegisterUserDto) {
        const { name, surname, email, password, confirmation } = newUser;
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new HttpException(
                `User with given email already exists`,
                HttpStatus.BAD_REQUEST,
            );
        }
        if (password !== confirmation) {
            throw new HttpException(
                `Passwords don't match`,
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = await this.usersService.create({
            name,
            surname,
            email,
            password: await hash(password, 4),
        });
        return { id: user.id, name, surname, email };
    }

    async login(credentials: LoginUserDto) {
        const { id, name, surname, email } = await this.validateUser(
            credentials.email,
            credentials.password,
        );
        const tokens = this.tokenService.generateTokens({
            sub: id,
            email,
            name,
        });
        await this.tokenService.saveRefreshToken(id, tokens.refreshToken);
        return {
            ...tokens,
            user: { id, name, surname, email },
        };
    }

    async refresh(token: string) {
        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = await this.tokenService.verifyRefreshToken(token);
        const foundToken = await this.tokenService.findRefreshToken(token);
        if (!payload || !foundToken) {
            throw new UnauthorizedException();
        }
        const { id, name, surname, email } =
            await this.usersService.findByEmail(payload.email);
        const tokens = this.tokenService.generateTokens({
            sub: id,
            email,
            name,
        });
        await this.tokenService.saveRefreshToken(id, tokens.refreshToken);
        return {
            ...tokens,
            user: { id, name, surname, email },
        };
    }

    async logout(token: string) {
        if (!token) {
            throw new HttpException(
                `You're not logged in yet`,
                HttpStatus.UNAUTHORIZED,
            );
        }
        await this.tokenService.eraseRefreshToken(token);
        return 'Logged Out';
    }

    async resetPassword(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new HttpException(
                `User with given email doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        const confirmToken = randomUUID();
        this.userRequestedReset = { id: user.id, token: confirmToken };
        await this.mailService.sendMail({
            to: email,
            subject: 'Reset Password on Dive',
            template: 'password-reset',
            context: {
                link: `${process.env.CLIENT_URL}/auth#reset-password/${confirmToken}`,
            },
        });
        return 'Password reset link sent to your email. Please check your inbox and follow the instructions provided.';
    }

    async confirmReset(token: string, newPassword: string) {
        if (!this.userRequestedReset?.token) {
            throw new ForbiddenException();
        }
        if (token !== this.userRequestedReset.token) {
            throw new HttpException(
                `Provided token doesn't match the sent token`,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.usersService.update(this.userRequestedReset.id, {
            password: await hash(newPassword, 4),
        });
        this.userRequestedReset = undefined;
        return 'Your password has been successfully changed';
    }

    private async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await compare(password, user?.password))) {
            throw new HttpException(
                `Invalid credentials`,
                HttpStatus.UNAUTHORIZED,
            );
        }
        return user;
    }
}
