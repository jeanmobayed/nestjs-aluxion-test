import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInResponseDto } from './dto/signin-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @ApiOperation({
    description: 'Sign up a user',
  })
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
  
  @HttpCode(200)
  @ApiOperation({
    description: 'Sign in a user',
  })
  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<SignInResponseDto> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/recover-password')
  @HttpCode(200)
  @ApiOperation({
    description: 'Send an email with a code to allow the user to create a new password',
  })
  requestRecoverPassword(@Body(ValidationPipe) recoverPasswordDto: RecoverPasswordDto): Promise<void> {
    return this.authService.requestPasswordRecovery(recoverPasswordDto);
  }

  @Post('/update-password')
  @HttpCode(200)
  @ApiOperation({
    description: 'Allows an user to update his password if they lost/forgot it using a verification code',
  })
  updatePassword(@Body(ValidationPipe) updatePassowrdDto: UpdatePasswordDto): Promise<void> {
    return this.authService.updatePassword(updatePassowrdDto);
  }
}
