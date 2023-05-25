import { Injectable } from '@nestjs/common';
import {
    GetObjectCommand,
    ListObjectsCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';

@Injectable()
export class FilesService {
    private readonly s3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_S3_BUCKET_REGION,
        });
    }

    async upload(file: Express.Multer.File) {
        try {
            const extension = file.originalname.split('.')[1];
            const filename = `${crypto.randomUUID()}.${extension}`;
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: filename,
                    Body: file.buffer,
                }),
            );
            return filename;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOne(filename: string) {
        try {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: filename,
            });
            return getSignedUrl(this.s3Client, command, {
                expiresIn: 43200,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getAll() {
        try {
            const data = await this.s3Client.send(
                new ListObjectsCommand({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                }),
            );
            return data.Contents;
        } catch (error) {
            console.error(error);
        }
    }
}
