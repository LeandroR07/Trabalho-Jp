// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity'; // Importe o UsersModule

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'sqlite', // Exemplo: use 'mysql', 'postgres', 'mongodb', etc.
  //     database: 'db.sqlite', // O nome do seu arquivo de banco de dados
  //     // entities: [__dirname + '/**/*.entity{.ts,.js}'], // Encontra todas as entidades automaticamente
  //     synchronize: true, // Apenas para desenvolvimento! Cria as tabelas automaticamente
  //   }),
  //   User, // Inclua o seu módulo de usuários aqui
  // ],
  // controllers: [UsersController],
  // providers: [UsersService],

  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

