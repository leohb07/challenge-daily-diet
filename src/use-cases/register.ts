import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { generatePasswordHash } from '../util/generate-password-hash.util';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

export type RegisterUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUseCaseResponse = {
  user: User;
};

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    if (!name) {
      throw new InvalidCredentialsError();
    }

    if (!email) {
      throw new InvalidCredentialsError();
    }

    if (!password || password.length < 6) {
      throw new InvalidCredentialsError();
    }

    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await generatePasswordHash(password);

    const user = await this.userRepository.create({
      email,
      name,
      password: password_hash,
    });

    return {
      user,
    };
  }
}
