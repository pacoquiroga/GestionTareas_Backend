import { IsNumber, IsString } from 'class-validator';

export class CreateTareaDto {
  @IsString()
  readonly titulo: string;

  @IsString()
  readonly descripcion: string;

  @IsNumber()
  readonly usuarioId: number;
}
