import { compare } from 'bcrypt';
import { UserRepository } from '../domain/user.repository';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { UserNotFoundError } from './errors/user-not-found.error';
import { User } from '../domain/user';

export type AuthenticateUseCaseRequest = {
  email: string;
  password: string;
};

export type AuthenticateUseCaseResponse = {
  user: User;
};

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    if (!email) {
      throw new InvalidCredentialsError();
    }

    if (!password || password.length < 6) {
      throw new InvalidCredentialsError();
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    const doesPasswordMatches = await compare(password, user.password);
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
