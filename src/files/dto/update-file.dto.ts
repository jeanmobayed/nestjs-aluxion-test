import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';

export class UpdateFileDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}
  