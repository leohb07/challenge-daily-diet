import { randomUUID } from 'crypto';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private userCollection: User[] = [];

  async create(payload: User): Promise<User> {
    const user = {
      ...payload,
      _id: randomUUID(),
    };

    this.userCollection.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.userCollection.find((where) => where.email === email);

    if (!user) return null;

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.userCollection.find((where) => where._id === userId);

    if (!user) return null;

    return user;
  }
}
