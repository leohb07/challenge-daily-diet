import { hash } from 'bcrypt';
import { UserRepository } from '../domain/user.repository';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user.repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { UserNotFoundError } from './errors/user-not-found.error';
import { SALTS_ROUNDS } from '../constants';

let userRepository: UserRepository;
let sut: AuthenticateUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it('should not be able authenticate if e-mail is invalid', async () => {
    expect(
      async () =>
        await sut.execute({
          email: '',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able authenticate if password is invalid', async () => {
    expect(
      async () =>
        await sut.execute({
          email: 'john@example.com',
          password: '',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able authenticate if not found user', async () => {
    expect(
      async () =>
        await sut.execute({
          email: 'john@example.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should be able authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: await hash('123456', SALTS_ROUNDS),
    });

    const { user } = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    });

    expect(user._id).toEqual(expect.any(String));
    expect(user).toEqual(
      expect.objectContaining({
        email: 'john@example.com',
      }),
    );
  });
});
