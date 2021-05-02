import { File } from './file.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { User } from '../auth/entities/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { RolesEnum } from '../auth/enums/roles.enum';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
  private logger = new Logger('FileRepository');

  async getFiles(user: User): Promise<File[]> {
    const query = this.createQueryBuilder('file');

    if(user.role !== RolesEnum.ADMIN){
      query.where('file.userId = :userId', { userId: user.id });
    }

    try {
      const files = await query.getMany();
      return files;
    } catch (error) {
      this.logger.error(`Failed to get files for user "${user.email}".`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createFile(createFileDto: CreateFileDto, user: User): Promise<File> {
    const { name } = createFileDto;

    const file = new File();
    file.name = name;
    file.user = user;

    try {
      await file.save();
    } catch (error) {
      this.logger.error(`Failed to create a file for user "${user.email}". Data: ${createFileDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    delete file.user;
    return file;
  }
}
