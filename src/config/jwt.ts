import { JwtModuleOptions } from '@nestjs/jwt';

const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env;

const expireTime: number = parseInt(<string>JWT_EXPIRE_TIME, 10) || 3600;

export default {
  secret: JWT_SECRET,
  signOptions: {
    expiresIn: expireTime,
  },
} as JwtModuleOptions;