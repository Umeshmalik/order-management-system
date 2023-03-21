import { sign } from "jsonwebtoken";

const generateToken = (email: string) => {
  return sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;