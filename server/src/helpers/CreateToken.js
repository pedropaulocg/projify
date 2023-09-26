import jwt from 'jsonwebtoken'
import authconfig from '../config/authconfig.js';

export function createToken (user) {
  const { secret, expiresIn } = authconfig;

  return jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    secret,
    {
      expiresIn
    }
  )
}