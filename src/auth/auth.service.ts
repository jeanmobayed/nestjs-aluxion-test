import { Injectable, UnauthorizedException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SignInResponseDto } from './dto/signin-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { utc } from 'moment/moment';
import { RecoverPassword } from './entities/recover-password.entity';
import { EmailService } from '../email/email.service';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';
import {
  RECOVER_PASSWORD_CODE_EXPIRATION_ON_HOURS,
  RECOVER_PASSWORD_EMAIL_BODY,
  RECOVER_PASSWORD_EMAIL_SUBJECT,
  RECOVER_PASSWORD_MAX_CODE,
  RECOVER_PASSWORD_MIN_CODE,
} from './constants/recover-password.constants';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RecoverPassword)
    private readonly recoverPasswordRepository: Repository<RecoverPassword>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponseDto> {
    const email = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }

  async requestPasswordRecovery(recoverPasswordDto: RecoverPasswordDto): Promise<void> {
    const { email } = recoverPasswordDto;
    const user = await this.userRepository.findOne({ email }, { select: ['id', 'email'] });

    if (!user) {
      throw new NotFoundException();
    }

    const code = randomInt(RECOVER_PASSWORD_MIN_CODE, RECOVER_PASSWORD_MAX_CODE).toString();
    const expiration = utc().add(RECOVER_PASSWORD_CODE_EXPIRATION_ON_HOURS, 'hours');

    const recover = await this.recoverPasswordRepository.findOne({ email }, { select: ['id', 'email'] });

    await this.recoverPasswordRepository.save({ ...recover, code, expiration, email, valid: true });
        
    this.sendRecoverPasswordEmail(email, code);
  }

  async updatePassword(updatePassowrdDto: UpdatePasswordDto): Promise<void> {
    const { email, code, password } = updatePassowrdDto;
    const userPromise = this.userRepository.findOne({ email }, { select: ['id'] });

    const recoverPassword = await this.recoverPasswordRepository.findOne({ email, valid: true, code });

    if (!recoverPassword) {
      throw new BadRequestException('Code is not valid.');
    }

    recoverPassword.valid = false;
    await this.recoverPasswordRepository.save(recoverPassword);

    const now = utc();
    const isCodeAlreadyExpired = now.isAfter(recoverPassword.expiration);

    if (isCodeAlreadyExpired) {
      throw new BadRequestException('Code is already expired.');
    }

    const user = await userPromise;
    user.password = await bcrypt.hash(password, await bcrypt.genSalt());;
    await this.userRepository.save(user);
  }

  private sendRecoverPasswordEmail(email: string, code: string): Promise<void> {
    return this.emailService.sendMail({
      to: email,
      subject: RECOVER_PASSWORD_EMAIL_SUBJECT,
      text: RECOVER_PASSWORD_EMAIL_BODY + code,
    });
  }
}
