import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileRepository } from './file.repository';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRepository]),
    AuthModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
