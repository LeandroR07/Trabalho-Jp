import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(email: string, senha: string) {
    const exists = await this.usersRepository.findOne({ where: { email } });
    if (exists) {
      throw new Error('Usuário já existe');
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const user = this.usersRepository.create({ email, senha: senhaHash });
    await this.usersRepository.save(user);
  }

  async validateUser(email: string, senha: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const issenhaValid = await bcrypt.compare(senha, user.senha);
 
    if (!issenhaValid) {
      return null;
    }

    return user;
  }
}