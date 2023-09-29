import { AppError } from "../middlewares/errorHandler.js"
import * as yup from 'yup';
import Project from "../models/Project.js";
import User from "../models/User.js";
import 'dotenv/config'

export const storeProject = async (req, res, next) => {
  try{
    const { userId } = req.user
    const user = await User.findById(userId)
    const { name, description, participants } = req.body
    const file = req.file
    const schemaValidation = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    })

    try {
      await schemaValidation.validate({name, description})
    }catch (e) {
      throw new AppError(400, e.message)
    }
    let parsedParticipants = JSON.parse(participants)
    parsedParticipants.push(user)
    const project = await Project.create({
      name,
      description,
      leader: user,
      picture: file ? process.env.BACK_URL + process.env.PORT + '/public/' + file.filename : undefined,
      participants: parsedParticipants
    })

    return res.status(200).json(project)
  }catch(e) {
    next(e)
  }
}

export const listProjects = async (req, res, next) => {
  try {
    const { userId } = req.user
    const projects = await Project.find({
      participants: userId
    }).populate('participants')
    
    return res.status(200).json(projects)
  } catch (error) {
    next(error)
  }
}

export const findProjectByName = async (req, res, next) => {
  try {
    const { match } = req.query
    const regex = new RegExp(match, 'i')
    const projects = await Project.find({
      $or: [
        {name: {$regex: regex}, },
      ],
    }).populate('participants')  

    return res.status(200).json(projects)
  } catch (error) {
    next(error)
  }
}