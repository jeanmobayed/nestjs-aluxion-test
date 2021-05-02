import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { File } from '../../files/file.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../enums/roles.enum';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => File, (file) => file.user, { eager: true })
  files: File[];

  @IsString()
  @IsEnum(RolesEnum)
  @IsNotEmpty()
  @Column({ enum: RolesEnum, default: RolesEnum.USER })
  role: RolesEnum;
}
