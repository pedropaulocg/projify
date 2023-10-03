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