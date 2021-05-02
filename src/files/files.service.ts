import { v4, v5 } from 'uuid';
import { Readable } from 'stream';
import { AWSError, S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { ReadableFileInterface } from './interfaces/readable-file.interface';
import { File } from './file.entity';
import { User } from '../auth/entities/user.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { FileRepository } from './file.repository';
import { UpdateFileDto } from './dto/update-file.dto';
import { ConfigService } from 'nestjs-config';
import { RolesEnum } from '../auth/enums/roles.enum';
import { PromiseResult } from 'aws-sdk/lib/request';

@Injectable()
export class FilesService {
  private readonly s3Client: S3;

  private readonly bucket: string;
  private readonly folder: string;
  private readonly region: string;

  constructor(
    @InjectRepository(FileRepository)
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3({
      accessKeyId: this.configService.get('aws.accessKeyId'),
      secretAccessKey: this.configService.get('aws.secretAccessKey'),
      region: this.configService.get('aws.region'),
    });

    this.bucket = this.configService.get('aws.bucket');
    this.folder = 'file-manager';
  }

  async createFile(createFileDto: CreateFileDto, user: User): Promise<File> {
    const { name, content } = createFileDto;

    const fileExtension = this.getFileExtension(content);
    const fileFullPath = this.generateFilePath(name, this.folder, fileExtension);
    const mimetype = this.getMimetypeFromBase64(content);
    const { fileStream, bufferSize } = this.convertBase64FileToReadableStream(content);

    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Body: fileStream,
      Key: fileFullPath,
      ContentType: mimetype,
      ACL: 'public-read',
      ContentLength: bufferSize,
    };

    const response = await this.s3Client.upload(params).promise();

    const newFile: Partial<File> = {
      name,
      path: response.Key,
      url: response.Location,
      mimetype,
      user,
    };

    await this.fileRepository.save(newFile);

    delete newFile.user;

    return newFile as File;
  }

  async getFiles(user: User): Promise<File[]> {
    return this.fileRepository.getFiles(user);
  }

  async getFileById(id: number, user: User): Promise<File> {
    const found = await this.fileRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`File with ID "${id}" not found`);
    }

    if (found.userId !== user.id && user.role !== RolesEnum.ADMIN) {
      throw new ForbiddenException();
    }

    return found;
  }

  async downloadFile(id: number, user: User): Promise<PromiseResult<S3.GetObjectOutput, AWSError>>{
    const file = await this.getFileById(id, user);

    const params: S3.GetObjectRequest = {
      Bucket: this.bucket,
      Key: file.path,
    };

    return await this.s3Client.getObject(params).promise();
  }

  async deleteFile(id: number, user: User): Promise<void> {
    const file = await this.getFileById(id, user);

    await this.fileRepository.delete(file);
  }

  async updateFile(id: number, updateFileDto: UpdateFileDto, user: User): Promise<File> {
    const { name } = updateFileDto;
    const file = await this.getFileById(id, user);
    file.name = name;
    await file.save();
    return file;
  }

  private sanitizeFolder(folder: string): string {
    const lastCharacterPosition = folder.length - 1;
    const lastCharacter = folder[lastCharacterPosition];

    if (lastCharacter === '/') {
      return folder.substring(0, lastCharacterPosition);
    }

    return folder;
  }

  private convertBase64FileToReadableStream(content: string): ReadableFileInterface {
    const sanitizedFile = content.replace(/^data:([a-zA-Z0-9]*)\/\w+;base64,/, '');
    const contentBuffer = Buffer.from(sanitizedFile, 'base64');
    const bufferSize = contentBuffer.length;

    const fileStream = new Readable();

    fileStream._read = () => {};

    fileStream.push(contentBuffer);
    fileStream.push(null);

    return {
      fileStream,
      bufferSize,
    };
  }

  private getMimetypeFromBase64(file: string): string {
    const mimetype = /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/.exec(file);

    return mimetype[1];
  }

  private getFileExtension(file: string): string {
    const mimetype = this.getMimetypeFromBase64(file);

    return mimetype.split('/')[1];
  }

  private generateFilePath(name: string, folder: string, extension: string): string {
    const fileUniqueName = v5(name, v4());
    const sanitizedFolder = this.sanitizeFolder(folder);

    return `${sanitizedFolder}/${fileUniqueName}.${extension}`;
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
