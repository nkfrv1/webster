// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParams } from './dto/url-params.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created',
        type: User,
    })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOkResponse({
        description: 'List of users',
        type: [User],
    })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        description: `The ID of the user to perform the operation with`,
    })
    @ApiOkResponse({
        description: 'Found user by specified id',
        type: User,
    })
    @ApiNotFoundResponse({
        description: 'The user was not found',
    })
    findOne(@Param() params: FindOneParams) {
        return this.usersService.findOne(params.id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        description: `The ID of the user to perform the operation with`,
    })
    @ApiOkResponse({
        description: 'The user has been successfully updated',
        type: User,
    })
    @ApiBadRequestResponse({
        description: 'Failed attempt to modify the non-existent user',
    })
    update(
        @Param() params: FindOneParams,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(params.id, updateUserDto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: `The ID of the user to perform the operation with`,
    })
    @ApiOkResponse({
        description: 'The user has been successfully removed',
        type: User,
    })
    @ApiBadRequestResponse({
        description: 'Failed attempt to remove the non-existent user',
    })
    remove(@Param() params: FindOneParams) {
        return this.usersService.remove(params.id);
    }
}
