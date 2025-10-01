import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Marca a classe como uma entidade do banco de dados
export class User {
  @PrimaryGeneratedColumn() // Define a coluna de ID
  id: number;

  @Column({ unique: true }) // Define a coluna de e-mail e garante que ele seja único
  email: string;

  @Column() // Define a coluna da senha
  senha: string;

  // Você pode adicionar mais colunas aqui, como nome, data de criação, etc.
  @Column({ default: true })
  isActive: boolean;
}