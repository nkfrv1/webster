import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateImageDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}
