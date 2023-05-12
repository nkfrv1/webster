import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ expandVariables: true }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
        UsersModule,
    ],
})
export class AppModule {}
