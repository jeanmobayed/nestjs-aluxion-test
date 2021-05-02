import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
