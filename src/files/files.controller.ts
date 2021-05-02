import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './file.entity';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('files')
@Controller('files')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class FilesController {
  private readonly logger = new Logger('FilesController');

  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    description: 'Get all files, filtered by user if user is not admin',
  })
  @ApiOkResponse({
    type: [File],
  })
  @Get()
  getFiles(@GetUser() user: User): Promise<File[]> {
    return this.filesService.getFiles(user);
  }

  @ApiOperation({
    description: 'Download file by id',
  })
  @Get('/download/:id')
  async downloadFile(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Res() res: Response) {
    const s3Object = await this.filesService.downloadFile(id, user);
    const stream = this.filesService.getReadableStream(s3Object.Body as Buffer);

    res.set({
      'Content-Type': s3Object.ContentType,
      'Content-Length': s3Object.ContentLength,
    });

    stream.pipe(res);
  }

  @ApiOperation({
    description: 'Get file by id',
  })
  @ApiOkResponse({
    type: File,
  })
  @Get('/:id')
  getFileById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<File> {
    return this.filesService.getFileById(id, user);
  }

  @ApiOperation({
    description: 'Upload a file, content must be base64',
  })
  @Post()
  @UsePipes(ValidationPipe)
  createFile(@Body() createFileDto: CreateFileDto, @GetUser() user: User): Promise<File> {
    return this.filesService.createFile(createFileDto, user);
  }

  @ApiOperation({
    description: 'Deletes file by id',
  })
  @Delete('/:id')
  deleteFile(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.filesService.deleteFile(id, user);
  }

  @ApiOperation({
    description: 'Update file name',
  })
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateFile(@Param('id', ParseIntPipe) id: number, @Body() updateFileDto: UpdateFileDto, @GetUser() user: User): Promise<File> {
    return this.filesService.updateFile(id, updateFileDto, user);
  }
}
