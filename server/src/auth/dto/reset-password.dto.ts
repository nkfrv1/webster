import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';

export class PasswordResetDto extends PickType(RegisterUserDto, ['email']) {}
