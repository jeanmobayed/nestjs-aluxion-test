import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { EmailOptionsInterface } from './interfaces/email-options.interface';
import { EmailModuleAsyncOptions } from './interfaces/email-module-async-options.interface';
import { EmailService } from '../email/email.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {
  static registerAsync(options: EmailModuleAsyncOptions): DynamicModule {
    const optionsProvider: Provider<EmailOptionsInterface | Promise<EmailOptionsInterface>> = {
      provide: 'EMAIL_CONFIG',
      inject: options.inject,
      useFactory: options.useFactory,
    };

    return {
      module: EmailModule,
      imports: options.imports,
      providers: [optionsProvider],
    };
  }
}
