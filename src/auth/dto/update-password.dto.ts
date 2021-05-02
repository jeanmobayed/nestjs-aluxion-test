import { IsEmail, IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak, must have letters, numbers and special characters',
  })
  @IsNotEmpty()
  password: string;
}
