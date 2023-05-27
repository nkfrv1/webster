import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ImagesModule } from './images/images.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ expandVariables: true }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
        UsersModule,
        FilesModule,
        ImagesModule,
        TokensModule,
        AuthModule,
    ],
})
export class AppModule {}
