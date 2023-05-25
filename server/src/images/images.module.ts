import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image, ImageSchema } from './image.schema';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
        UsersModule,
        FilesModule,
    ],
    controllers: [ImagesController],
    providers: [ImagesService],
    exports: [ImagesService],
})
export class ImagesModule {}
