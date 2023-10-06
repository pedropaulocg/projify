import { AppError } from "../middlewares/errorHandler.js"
import * as yup from 'yup';
import Project from "../models/Project.js";
import User from "../models/User.js";
import 'dotenv/config'
import mongoose from "mongoose";

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

export const editProject = async (req, res, next) => {
  try{
    const { projectId } = req.params
    const { name, description, participants, leader } = req.body
    const file = req.file

    let parsedParticipants = JSON.parse(participants)
    const project = await Project.findByIdAndUpdate(projectId, {
      name,
      description,
      leader,
      picture: file ? process.env.BACK_URL + process.env.PORT + '/public/' + file.filename : undefined,
      participants: parsedParticipants
    })

    return res.status(200).json(project)
  }catch(e) {
    next(e)
  }
}

export const leaveProject = async (req, res, next) => {
  try{
    const ObjectId = mongoose.Types.ObjectId
    const { projectId } = req.params
    const objProjectId = new ObjectId(projectId)
    const { userId } = req.user
    const project = await Project.findById(objProjectId)
    console.log(project)
    const userIndex = project.participants.findIndex(item =>  item._id.toString() === userId)
    const participants = [...project.participants]
    participants.splice(userIndex, 1)
    await Project.findOneAndUpdate(objProjectId, {
      participants
    })

    return res.status(200).json({message: "User removed"})
  }catch(e) {
    next(e)
  }
}

export const deactivateProject = async (req, res, next) => {
  try{
    const ObjectId = mongoose.Types.ObjectId
    const { projectId } = req.params
    const objProjectId = new ObjectId(projectId)
    const project = await Project.findById(objProjectId)
    await Project.findOneAndUpdate(objProjectId, {
      isActive: project.isActive || project.isActive === undefined ? false : true
    })

    return res.status(200).json({message: "Project status updated"})
  }catch(e) {
    next(e)
  }
}

export const listProjects = async (req, res, next) => {
  try {
    const { userId } = req.user
    const projects = await Project.find({
      participants: userId,
      $or: [{isActive: true}, {isActive: undefined}]
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

export const listProjectParticipants = async (req, res, next) => {
  try {
    const { projectId } = req.params
    const { participants } = await Project.findById(projectId).populate('participants')
    
    return res.status(200).json(participants)
  } catch(err){
    next(err)
  }
}

export const findProjectById = async (req, res, next) => {
   try {
    const { projectId } = req.params
    const project = await Project.findOne(new mongoose.Types.ObjectId(projectId)).populate('participants')

    return res.status(200).json(project)
  } catch(err){
   next(err)
  }
}