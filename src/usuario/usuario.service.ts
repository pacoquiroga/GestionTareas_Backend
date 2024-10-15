import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './entities/usuario.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const existingUser = await this.usuariosRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = this.usuariosRepository.create({
      username,
      password: hashedPassword,
    });

    await this.usuariosRepository.save(usuario);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; user: { id: number; username: string } }> {
    const { username, password } = authCredentialsDto;
    const usuario = await this.usuariosRepository.findOne({
      where: { username },
    });

    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const payload = { id: usuario.id, username: usuario.username };
      const token = await this.jwtService.sign(payload);

      return {
        token,
        user: {
          id: usuario.id,
          username: usuario.username,
        },
      };
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<Usuario> {
    return this.usuariosRepository.findOne({ where: { username } });
  }
}
