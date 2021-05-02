import { ModuleMetadata } from '@nestjs/common';

import { EmailOptionsInterface } from './email-options.interface';

export interface EmailModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: Array<Function>;
  useFactory: (...args: any[]) => Promise<EmailOptionsInterface> | EmailOptionsInterface;
}
