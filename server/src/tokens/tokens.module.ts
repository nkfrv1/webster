import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { Token, TokenSchema } from './token.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        JwtModule.register({}),
    ],
    providers: [TokensService],
    exports: [TokensService],
})
export class TokensModule {}
