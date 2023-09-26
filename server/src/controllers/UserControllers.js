import User from "../models/User.js"
import argon2 from 'argon2'
import { AppError } from "../middlewares/errorHandler.js"
import * as yup from 'yup';
import 'dotenv/config'
import { createToken } from "../helpers/CreateToken.js";

export const storeUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required().test(
        'Verify email',
        'This email is already in use',
        async () => {
          const emailExists = await User.findOne({email})
          return !emailExists
        }
      ),
      password: yup.string().required(),
    });

    try {
      await schema.validate({email, password, name})
    } catch (err) {
      throw new AppError(400, err.message)
    }
    const hashedpass = await argon2.hash(password, process.env.SALT)
    const user = await User.create({
      name,
      email,
      password: hashedpass
    })
    const token = createToken(user)
    return res.status(200).json({token, username: user.name})
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    let schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    // veirify fields
    try {
      await schema.validate({email, password})
    } catch (err) {
      throw new AppError(400, err.message)
    }
    // find user
    const user = await User.findOne({
      email
    })
    // verify user
    if (!user) throw new AppError(404, "Invalid credentials")
    // verify password
    const match = await argon2.verify(user.password, password, process.env.SALT)
    if (!match) throw new AppError(400, "Invalid credentials")

    // create token
    const token = createToken(user)
    return res.status(200).json({token, username: user.name})
  } catch (err) {
    next(err)
  }

}