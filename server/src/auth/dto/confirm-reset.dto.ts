import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';

export class ConfirmResetDto extends PickType(RegisterUserDto, ['password']) {}
