import { hash, genSaltSync} from "bcrypt";

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hashedPassword = await hash(password, salt);
    return {
        hashedPassword,
        salt
    }
}

const verifyPassword = async (password: string, salt: string, storedPassword: string)  =>{
    const hashedPassword = await hash(password, salt);
    return storedPassword === hashedPassword;
}

export {
    hashPassword,
    verifyPassword
}