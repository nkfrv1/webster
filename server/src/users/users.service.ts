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
        return this.userModel.find().populate('images');
    }

    async findOne(id: string) {
        const target = await this.userModel.findById(id).populate('images');
        if (!target) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return target;
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const target = await this.userModel.findById(id);
        if (!target) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        return target.set(updateUserDto).save();
    }

    async remove(id: string) {
        const target = await this.userModel.findById(id);
        if (!target) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        return target.deleteOne();
    }
}
