import * as yup from 'yup';
import { AppError } from '../middlewares/errorHandler.js';
import Board from '../models/Board.js';
import mongoose from 'mongoose';
import Task from '../models/Task.js'


export const storeBoard = async (req, res, next) => {
  try {
    const { name, color } = req.body
    let { position } = req.body
    const { projectId } = req.params
    const schemaValidation = yup.object().shape({
      name: yup.string().required(),
      color: yup.string().required(),
    })
    try {
      await schemaValidation.validate({name, color})
    } catch (error) {
      throw new AppError(400, error.message)
    }
    if(!position) {
      const count = await Board.count()
      position = count + 1
    }
    const board = await Board.create({
      name,
      color,
      position,
      project: projectId
    })

    return res.status(200).json(board)
  } catch(err){
   next(err)
  }
}

export const updateBoard = async (req, res, next) => {
  try {
    const body = req.body
    const { boardId } = req.params
    const updateObj = {}
    for(let key in body) {
      if(body[key] !== undefined) {
        updateObj[key] = body[key]
      }
    }
    const board = await Board.findOneAndUpdate(new mongoose.Types.ObjectId(boardId), updateObj)

    return res.status(200).json(board)
  } catch(err){
    next(err)
  }
}

export const listBoards = async (req, res, next) => {
  try {
    const { projectId } = req.params
    const boards = await Board.find({
      project: projectId
    }).sort('position')

    return res.status(200).json(boards)
  } catch(err){
  next(err)
  }
}

export const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const tasks = await Task.findOne({
      board: new mongoose.Types.ObjectId(boardId)
    })
    if (tasks) {
      throw new AppError(400, "Remove all tasks from this board first.")
    }
    await Board.findOneAndDelete(new mongoose.Types.ObjectId(boardId))
    return res.status(200).json({message: "board deleted"})
  } catch(err){
    next(err)
  }
}