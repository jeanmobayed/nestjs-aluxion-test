import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { EmailModule } from './email/email.module';
import { EmailOptionsInterface } from './email/interfaces/email-options.interface';

const configFiles = resolve(__dirname, 'config', '**', '!(*.d).{ts,js}');

@Module({
  imports: [
    ConfigModule.load(configFiles),
    EmailModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): EmailOptionsInterface =>
        ({
          ...configService.get('mail'),
        } as EmailOptionsInterface),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm') as TypeOrmModuleOptions,
    }),
    FilesModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
