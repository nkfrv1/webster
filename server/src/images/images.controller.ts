// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { Image } from './image.schema';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FindOneParams } from 'src/users/dto/url-params.dto';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiCreatedResponse({
        description: 'The image has been successfully created',
        type: Image,
    })
    create(
        @Body() createImageDto: CreateImageDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        return this.imagesService.create(createImageDto, image);
    }

    @Get()
    @ApiOkResponse({
        description: 'List of images',
        type: [Image],
    })
    findAll() {
        return this.imagesService.findAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        description: `The ID of the image to perform the operation with`,
    })
    @ApiOkResponse({
        description: 'Found image by specified id',
        type: Image,
    })
    @ApiNotFoundResponse({
        description: 'The image was not found',
    })
    findOne(@Param() params: FindOneParams) {
        return this.imagesService.findOne(params.id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        description: `The ID of the image to perform the operation with`,
    })
    @ApiOkResponse({
        description: 'The image has been successfully updated',
        type: Image,
    })
    @ApiBadRequestResponse({
        description: 'Failed attempt to modify the non-existent image',
    })
    update(
        @Param() params: FindOneParams,
        @Body() updateImageDto: UpdateImageDto,
    ) {
        return this.imagesService.update(params.id, updateImageDto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: `The ID of the image to perform the operation with`,
    })
    @ApiOkResponse({
        description: 'The image has been successfully removed',
        type: Image,
    })
    @ApiBadRequestResponse({
        description: 'Failed attempt to remove the non-existent image',
    })
    remove(@Param() params: FindOneParams) {
        return this.imagesService.remove(params.id);
    }
}
