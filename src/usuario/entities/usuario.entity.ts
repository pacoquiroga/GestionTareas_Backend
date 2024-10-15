import { Tarea } from 'src/tareas/entities/tarea.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tareas: Tarea[];
}
