import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: { email: string; senha: string }): Promise<User> {
    const { email, senha } = userData;

    // Validação básica manual
    if (!email || !senha) {
      throw new BadRequestException('E-mail e senha são obrigatórios.');
    }
    if (senha.length < 6) {
      throw new BadRequestException('A senha deve ter no mínimo 6 caracteres.');
    }
    if (!email.includes('@')) {
      throw new BadRequestException('O e-mail deve ser um endereço de e-mail válido.');
    }

    // Verifica se o usuário já existe
    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (userExists) {
      throw new BadRequestException('Este e-mail já está em uso.');
    }

    // Cria e salva o novo usuário no banco de dados
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  // Método para encontrar um usuário por e-mail (necessário para o login)
async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}