import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ImagesModule } from './images/images.module';

@Module({
    imports: [
        ConfigModule.forRoot({ expandVariables: true }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
        UsersModule,
        FilesModule,
        ImagesModule,
    ],
})
export class AppModule {}
