import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Token } from './token.schema';

@Injectable()
export class TokensService {
    constructor(
        @InjectModel(Token.name)
        private tokenModel: Model<Token>,
        private readonly jwtService: JwtService,
    ) {}

    generateTokens(payload: any) {
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '30m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '1d',
        });
        return { accessToken, refreshToken };
    }

    async saveRefreshToken(subject: string, token: string) {
        const existingToken = await this.tokenModel.findOne({
            userId: subject,
        });
        if (existingToken) {
            return existingToken.set({ refreshToken: token }).save();
        }
        return this.tokenModel.create({ userId: subject, refreshToken: token });
    }

    verifyAccessToken(accessToken: string) {
        try {
            return this.jwtService.verify(accessToken, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
        } catch (error) {
            console.error(error.message, error.expiredAt);
            throw error;
        }
    }

    verifyRefreshToken(refreshToken: string) {
        try {
            return this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    findRefreshToken(token: string) {
        const payload = this.jwtService.decode(token);
        return this.tokenModel.findOne({ userId: payload.sub });
    }

    eraseRefreshToken(token: string) {
        const payload = this.jwtService.decode(token);
        return this.tokenModel.findOneAndDelete({ userId: payload.sub });
    }
}
