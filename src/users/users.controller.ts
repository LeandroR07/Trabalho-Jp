import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: any) {
    const { email, senha } = body;

    // Chama o serviço para criar o usuário com os dados do corpo
    const user = await this.usersService.create({ email, senha });

    // Retorna uma resposta simples (sem a senha)
    return {
      id: user.id,
      email: user.email,
      message: 'Usuário cadastrado com sucesso!',
    };
  }
}