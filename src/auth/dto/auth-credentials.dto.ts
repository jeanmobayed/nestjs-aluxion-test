import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak, must have letters, numbers and special characters',
  })
  password: string;
}
