import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

@Entity()
export class RecoverPassword extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  @Column()
  code: string;

  @IsDate()
  @IsNotEmpty()
  @Column({ type: 'timestamptz' })
  expiration: Date;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @Column({ default: true })
  valid: boolean;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;
}
