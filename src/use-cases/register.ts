import { InvalidCredentials } from './errors/invalid-credentials.error';

export interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
export class RegisterUseCase {
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    if (!name) {
      throw new InvalidCredentials();
    }

    if (!email) {
      throw new InvalidCredentials();
    }

    if (!password) {
      throw new InvalidCredentials();
    }
  }
}
