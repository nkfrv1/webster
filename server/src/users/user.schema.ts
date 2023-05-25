import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Image } from 'src/images/image.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop()
    surname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }] })
    images: Image[];
}

export const UserSchema = SchemaFactory.createForClass(User);
