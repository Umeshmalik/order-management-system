import { verify, JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
    email: string
}

const decryptToken = (token: string) => {
    if (token && token.startsWith("Bearer")) {
        token = token.split(" ").pop();
        return verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
    }
    throw new Error("No authorization token found.")
}

export default decryptToken;