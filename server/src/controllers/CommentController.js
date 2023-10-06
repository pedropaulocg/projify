import mongoose from "mongoose"
import Comment from "../models/Comment.js"

export const CreateComment = async (req, res, next) => {
   try {
    const { taskId: task } = req.params
    const { body, owner } = req.body

    const comment = await Comment.create({
      body,
      owner,
      task
    })

    return res.status(200).json(comment)
  } catch(err){
    next(err)
  }
}

export const ListComments = async (req, res, next) => {
   try {
    const { taskId: task } = req.params
    const comment = await Comment.find({
      task
    }).sort({createdAt: -1}).populate('owner')

    return res.status(200).json(comment)
  } catch(err){
    next(err)
  }
}

export const UpdateComment = async (req, res, next) => {
  try {
   const { commentId } = req.params
   const { body, owner } = req.body

   const comment = await Comment.findOneAndUpdate(new mongoose.Types.ObjectId(commentId) ,{
     body,
     owner
   })

   return res.status(200).json(comment)
 } catch(err){
   next(err)
 }
}

export const deleteComment = async (req, res, next) => {
   try {
    const { commentId } = req.params

    await Comment.findOneAndDelete(new mongoose.Types.ObjectId(commentId))

    return res.status(200).json({message: 'Comment deleted'})
  } catch(err){
    next(err)
  }
}