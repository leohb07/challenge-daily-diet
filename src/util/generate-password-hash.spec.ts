import { PASSWORD_TO_TEST } from '../constants';
import { generatePasswordHash } from './generate-password-hash.util';

describe('Generate Password Hash', () => {
  it('should be able create a password hash', async () => {
    const password_hash = await generatePasswordHash(PASSWORD_TO_TEST);

    expect(password_hash).toEqual(expect.any(String));
  });
});
