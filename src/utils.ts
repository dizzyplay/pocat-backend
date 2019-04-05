import bcrypt from 'bcrypt';

export const setPassword = async password => {
  const saltRound = 10;
  const hash = await bcrypt.hash(password, saltRound).then();
  return hash;
};

export const checkPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
