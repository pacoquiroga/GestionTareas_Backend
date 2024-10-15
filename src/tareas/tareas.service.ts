import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { TareaResponseDto } from './dto/response-tarea.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createTareaDto: CreateTareaDto): Promise<TareaResponseDto> {
    const { titulo, descripcion, usuarioId } = createTareaDto;
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuario con id: ${usuarioId} no se encontró en la base de datos`,
      );
    }

    const nuevaTarea = this.tareaRepository.create({
      titulo,
      descripcion,
      usuario,
    });

    const tareaGuardada = await this.tareaRepository.save(nuevaTarea);

    return {
      id: tareaGuardada.id,
      titulo: tareaGuardada.titulo,
      descripcion: tareaGuardada.descripcion,
      completado: tareaGuardada.completado,
      usuarioId: tareaGuardada.usuario.id,
    };
  }

  async findAll(userId: number): Promise<TareaResponseDto[]> {
    const tareas = await this.tareaRepository.find({
      where: { usuario: { id: userId } },
      relations: ['usuario'],
    });
    return tareas.map((tarea) => ({
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completado: tarea.completado,
      usuarioId: tarea.usuario.id,
    }));
  }

  async findOne(id: number): Promise<TareaResponseDto | null> {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!tarea) {
      throw new NotFoundException(
        `Tarea con id: ${id} no se encontró en la base de datos`,
      );
    }
    return {
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completado: tarea.completado,
      usuarioId: tarea.usuario.id,
    };
  }

  async update(
    id: number,
    updateTareaDto: UpdateTareaDto,
  ): Promise<TareaResponseDto | null> {
    const tareaBusqueda = await this.tareaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!tareaBusqueda) {
      throw new NotFoundException(
        `Tarea con id: ${id} no se encontró en la base de datos`,
      );
    }

    await this.tareaRepository.update(id, updateTareaDto);
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    return {
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completado: tarea.completado,
      usuarioId: tarea.usuario.id,
    };
  }

  async remove(id: number): Promise<string> {
    const tareaBusqueda = await this.tareaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!tareaBusqueda) {
      throw new NotFoundException(
        `Tarea con id: ${id} no se encontró en la base de datos`,
      );
    }

    await this.tareaRepository.delete(id);

    return `Tarea con id: ${id} eliminada correctamente`;
  }
}
