import { hash } from 'bcrypt';
import { SALTS_ROUNDS } from '../constants';

export async function generatePasswordHash(password: string): Promise<string> {
  return await hash(password, SALTS_ROUNDS);
}
