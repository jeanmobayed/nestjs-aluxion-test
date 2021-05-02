import { Column, Entity, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../auth/entities/user.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class File extends BaseEntity {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiResponseProperty()
  @Column()
  name: string;

  @ApiResponseProperty()
  @Column()
  path: string;

  @ApiResponseProperty()
  @Column()
  mimetype: string;

  @ApiResponseProperty()
  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.files, { eager: false })
  user: User;

  @ApiResponseProperty()
  @Column()
  userId: number;
}
