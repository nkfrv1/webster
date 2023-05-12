import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        return this.userModel.create(createUserDto);
    }

    async findAll() {
        return this.userModel.find();
    }

    async findOne(id: string) {
        const target = await this.userModel.findById(id);
        if (!target) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return target;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
    }

    async remove(id: string) {
        return this.userModel.findByIdAndRemove(id);
    }
}
