import { PartialType } from '@nestjs/mapped-types';
import { CreateTareaDto } from './create-tarea.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {
  @IsNumber()
  @IsOptional()
  readonly id?: number;

  @IsString()
  @IsOptional()
  readonly titulo?: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsBoolean()
  @IsOptional()
  readonly completado?: boolean;
}
