import * as yup from 'yup';
import { AppError } from '../middlewares/errorHandler.js';
import Board from '../models/Board.js';


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

export const listBoards = async (req, res, next) => {
  try {
    const { projectId } = req.params
    const boards = await Board.find({
      project: projectId
    })

    return res.status(200).json(boards)
  } catch(err){
  next(err)
  }
}