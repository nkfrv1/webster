// eslint-disable-next-line prettier/prettier
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.schema';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(Image.name)
        private imageModel: Model<Image>,
        private readonly usersService: UsersService,
        private readonly filesService: FilesService,
    ) {}

    async create(createImageDto: CreateImageDto, image: Express.Multer.File) {
        const user = await this.usersService.findOne(createImageDto.userId);
        const filename = await this.filesService.upload(image);
        const newImage = await this.imageModel.create({
            ...createImageDto,
            name: filename,
        });
        await user.updateOne({ $push: { images: newImage.id } });
        return newImage;
    }

    async findAll() {
        return this.imageModel.find();
    }

    async findOne(id: string) {
        const target = await this.imageModel.findById(id);
        if (!target) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        const imageSource = await this.filesService.getOne(target.name);
        return { ...target.toObject(), source: imageSource };
    }

    async update(id: string, updateImageDto: UpdateImageDto) {
        const target = await this.imageModel.findById(id);
        if (!target) {
            throw new HttpException('Image not found', HttpStatus.BAD_REQUEST);
        }
        return target.set(updateImageDto).save();
    }

    async remove(id: string) {
        const target = await this.imageModel.findById(id);
        if (!target) {
            throw new HttpException('Image not found', HttpStatus.BAD_REQUEST);
        }
        const user = await this.usersService.findOne(target.userId);
        await user.updateOne({ $pull: { images: target.id } });
        return target.deleteOne();
    }
}
