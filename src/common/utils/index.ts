import * as bcrypt from 'bcrypt';
import { CRYPT_SALT } from 'src/common/config';

export const setHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(Number.parseInt(CRYPT_SALT, 10));
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  oldPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, oldPassword);
};
