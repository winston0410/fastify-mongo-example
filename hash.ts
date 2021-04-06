import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword:string) {
  return await bcrypt.hash(plainPassword,SALT_ROUNDS);
};

export async function checkPassword(plainPassword:string,hashPassword:string){
    const match = await bcrypt.compare(plainPassword,hashPassword);
    return match;
}
