import * as yup from 'yup'
import Task from '../models/Task.js'
import Project from '../models/Project.js'
import Board from '../models/Board.js'
import { AppError } from '../middlewares/errorHandler.js'
import mongoose from 'mongoose'

export const storeTask = async (req, res, next) => {
  try {
    const { name, description, assigned, deadline, priority } = req.body
    const { projectId: project, boardId: board } = req.params
    const { userId: reporter } = req.user
    const schemaValidation = yup.object().shape({
      name: yup.string().required(),
      board: yup.string().required(),
      assigned: yup.string().required()
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
    const { name, priority, assigned } = req.query.filters

    const filterObj = []
    if (priority) {
      filterObj.push({
        priority
      })
    }    
    if (assigned) {
      filterObj.push({
        assigned
      })
    }    
    const tasks = await Task.find({
      $and: [
        { project: new ObjectId(project)},
        { board: new ObjectId(board) },
        {name: {$regex: new RegExp(name, 'i')}, },
        ...filterObj
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

export const getTaskPerPeriod = async (req, res, next) => {
  try {
    const { projectId } = req.params
    const { userId } = req.user
    const { period } = req.query
    let startDate, endDate

    switch (period) {
      case 'day':
        startDate = new Date()
        startDate.setHours(0, 0, 0, 0)

        endDate = new Date()
        endDate.setHours(23, 59, 59, 999)
        break

      case 'week':
        startDate = getMonday(new Date())
        startDate.setHours(0, 0, 0, 0)

        endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 6)
        endDate.setHours(23, 59, 59, 999)
        break

      case 'month':
        startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        startDate.setHours(0, 0, 0, 0)

        endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + 1)
        endDate.setDate(0)
        endDate.setHours(23, 59, 59, 999)
        break

      default:
        return res.status(400).json({ message: 'Invalid period specified' })
    }

    const tasks = await Task.find({
      $and: [
        { project: projectId },
        { deadline: { $gte: startDate, $lte: endDate } },
        {
          $or: [
            { assigned: userId },
            { reporter: userId },
          ]
        }
      ]
    }).populate('board')

    return res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
}

function getMonday(date) {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

export const taskPeruserChart = async (req, res, next) => {
   try {
    const { projectId } = req.params
    const { participants } = await Project.findById(new mongoose.Types.ObjectId(projectId)).select('participants').populate('participants')
    const data = {}
    for(let i = 0; i < participants.length; i++) {
      const count = await Task.count({
        assigned: participants[i]._id
      })
      data[participants[i].name] = count
    }

    return res.status(200).json(data)
  } catch(err){
    next(err)
  }
}

export const taskPerBoard = async (req, res, next) => {
   try {
    const { projectId } = req.params
    const boards = await Board.find({
      project: new mongoose.Types.ObjectId(projectId)
    })
    const data = {}
    for(let i = 0; i < participants.length; i++) {
      const count = await Task.count({
        assigned: participants[i]._id
      })
      data[participants[i].name] = count
    }

    return res.status(200).json(data)
  } catch(err){
    next(err)
  }
}

export const listTasksPerProject = async (req, res, next) => {
   try {
    const { projectId } = req.params
    const { page, filters } = req.query
    const { name, board, assigned } = filters
    const limit = 10
    const offset = page * limit
    const filterObj = []
    if (board) {
      filterObj.push({
        board
      })
    }    
    if (assigned) {
      filterObj.push({
        assigned
      })
    }    
    const tasks = await Task.find(
      {
        $and: [
          { project: projectId },
          {name: {$regex: new RegExp(name, 'i')}, },
          ...filterObj
        ]
      }
      ).skip(offset).limit(limit).populate('board').populate('assigned').populate('reporter')
      
      const count = await Task.count({
        project: projectId
      })
      console.log(offset, limit, tasks, page)

    return res.status(200).json({tasks, count})
  } catch(err){
    console.log(err)
    next(err)
  }
}