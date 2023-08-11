import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ImagesModule } from './images/images.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ expandVariables: true }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                port: +process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASS,
                },
            },
            template: {
                dir: path.join(__dirname, '..', 'templates'),
                adapter: new HandlebarsAdapter(),
            },
        }),
        UsersModule,
        FilesModule,
        ImagesModule,
        TokensModule,
        AuthModule,
    ],
})
export class AppModule {}
