import * as yup from 'yup';
import Task from '../models/Task.js'
import { AppError } from '../middlewares/errorHandler.js';
import mongoose from 'mongoose';

export const storeTask = async (req, res, next) => {
  try {
    const { name, description, assigned, deadline, priority } = req.body
    const { projectId: project, boardId: board } = req.params
    const { userId: reporter } = req.user
    const schemaValidation = yup.object().shape({
      name: yup.string().required(),
      board: yup.string().required(),
    })

    try {
      await schemaValidation.validate({name, board})
    }catch (e) {
      throw new AppError(400, e.message)
    }

    const task = await Task.create({
      name,
      description,
      board,
      project,
      reporter,
      deadline,
      assigned,
      priority
    })

    return res.status(200).json(task)

  } catch(err){
    next(err)
  }
}

export const listTaskPerBoard = async (req, res, next) => {
  try {
    const ObjectId = mongoose.Types.ObjectId
    const { projectId: project, boardId: board } = req.params
    const tasks = await Task.find({
      $and: [
        { project: new ObjectId(project)},
        { board: new ObjectId(board) }
      ]
    }).populate('assigned').populate('reporter')
    
    return res.status(200).json(tasks)
  } catch(err){
    next(err)
  }
}

export const changeTaskBoard = async (req, res, next) => {
  try {
    const { destiantionBoard, taskId } = req.body
    const task = await Task.findOneAndUpdate(new mongoose.Types.ObjectId(taskId),{
      board: new mongoose.Types.ObjectId(destiantionBoard)
    })

    return res.status(200).json(task)
  } catch(err){
    next(err)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const body = req.body
    const updateObj = {}
    for(let key in body) {
      if(body[key] !== undefined) {
        updateObj[key] = body[key]
      }
    }
    const task = await Task.findOneAndUpdate(new mongoose.Types.ObjectId(taskId), updateObj, {new: true}).populate('reporter').populate('assigned')

    return res.status(200).json(task)
  } catch(err){
    next(err)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    await Task.findOneAndDelete(new mongoose.Types.ObjectId(taskId))

    return res.status(200).json({message: 'task deleted'})
  } catch(err){
    next(err)
  }
}