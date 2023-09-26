import { AppError } from "./errorHandler.js";
import authconfig from '../config/authconfig.js';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

const auth = (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    throw new AppError(403, "Token not provided");
  }

  const [, token] = headerToken.split(" ");

  try {
    const decoded = verify(token, authconfig.secret)
    const { userId } = decoded;

    req.user = {
      userId
    }
  } catch (e) {
    console.log(e);
    throw new AppError(403, "Session expired.");
  }

  return next()
}

export default auth