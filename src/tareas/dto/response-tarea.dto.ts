import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TareaResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsBoolean()
  completado: boolean;

  @IsNumber()
  usuarioId: number;
}
