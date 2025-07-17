import User from "../models/User.js"
import argon2 from 'argon2'
import { AppError } from "../middlewares/errorHandler.js"
import * as yup from 'yup';
import 'dotenv/config'
import { createToken } from "../helpers/CreateToken.js";
import { getGlobals } from 'common-es'
const { __dirname } = getGlobals(import.meta.url)

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
      password: hashedpass,
    })
    const token = createToken(user)
    return res.status(200).json({token, username: user.name, userId: user._id, profilePic: user.profilePic})
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
    if (!user) throw new AppError(404, "User doesn't exist")
    // verify password
    const match = await argon2.verify(user.password, password, process.env.SALT)
    if (!match) throw new AppError(400, "Invalid credentials")

    // create token
    const token = createToken(user)
    return res.status(200).json({token, username: user.name, userId: user._id, profilePic: user.profilePic})
  } catch (err) {
    next(err)
  }
}

export const findUsersByLetter = async (req, res, next) => {
  try {
    const { match } = req.query
    const { userId } = req.user
    const regex = new RegExp(match, 'i')
    const users = await User.find({
      $or: [
        {name: {$regex: regex}, },
        {email: {$regex: regex}, }
      ],
      _id: {$ne: userId}
    })     

    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
export const findUserById = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)

    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { name, email  } = req.body
    const file = req.file
    const user = await User.findByIdAndUpdate(userId, {
      name,
      email,
      profilePic: file ? process.env.BACK_URL + ':' + process.env.PORT + '/public/' + file.filename : undefined,
    }, {new: true})
    console.log(req.file)
    return res.status(200).json(user)
  } catch(err){
  next(err)
  }
}