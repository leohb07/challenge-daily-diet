import { InvalidCredentials } from './errors/invalid-credentials.error';
import { RegisterUseCase } from './register';

let sut: RegisterUseCase;

describe('Register User', () => {
  beforeEach(() => {
    sut = new RegisterUseCase();
  });

  it('should not be able register an user if name is invalid', async () => {
    const input = {
      name: '',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentials,
    );
  });

  it('should not be able register an user if email is invalid', async () => {
    const input = {
      name: 'test',
      email: '',
      password: '123456',
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentials,
    );
  });

  it('should not be able register an user if password is invalid', async () => {
    const input = {
      name: 'test',
      email: 'johndoe@example.com',
      password: '',
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentials,
    );
  });
});

// Recebe uma requisição do tipo POST na rota /api/signup
// Valida dados obrigatórios name, email, password e passwordConfirmation
// Valida que o campo email é um e-mail válido
// Valida se já existe um usuário com o email fornecido
// Gera uma senha criptografada (essa senha não pode ser descriptografada)
// Cria uma conta para o usuário com os dados informados, substituindo a senha pela senha criptorafada
// Retorna 201 sem informacao
