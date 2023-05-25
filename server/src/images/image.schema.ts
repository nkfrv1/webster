import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ timestamps: true })
export class Image {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
