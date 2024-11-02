import { User } from './user';

export interface UserRepository {
  create(payload: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
}
