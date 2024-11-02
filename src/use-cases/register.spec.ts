import { UserRepository } from '../domain/user.repository';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user.repository';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { RegisterUseCase } from './register';

let userRepository: UserRepository;
let sut: RegisterUseCase;

describe('Register User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepository);
  });

  it('should not be able register an user if name is invalid', async () => {
    const input = {
      name: '',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });

  it('should not be able register an user if email is invalid', async () => {
    const input = {
      name: 'test',
      email: '',
      password: '123456',
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });

  it('should not be able register an user if password is invalid', async () => {
    const input = {
      name: 'test',
      email: 'johndoe@example.com',
      password: '',
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });

  it('should not be able register an user with same e-mail', async () => {
    await sut.execute({
      email: 'john@example.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(
      async () =>
        await sut.execute({
          email: 'john@example.com',
          name: 'John Doe',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able register an user', async () => {
    const { user } = await sut.execute({
      email: 'john@example.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(user._id).toEqual(expect.any(String));
    expect(user).toEqual(
      expect.objectContaining({
        email: 'john@example.com',
        name: 'John Doe',
      }),
    );
  });
});
