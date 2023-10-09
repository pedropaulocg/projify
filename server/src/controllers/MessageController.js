import Message from "../models/Message.js"
import { io } from "../../index.js"

export const CreateMessage = async (req, res, next) => {
   try {
    const { body, replyMsg } = req.body
    const { userId: owner } = req.user
    const { projectId } = req.params

    const message = await Message.create({
      body,
      owner,
      project: projectId,
      replyMsg: replyMsg ? replyMsg._id : undefined
    })
    
    await Message.populate(message, 'owner')
    if(replyMsg) {
      await Message.populate(message, {
        path : 'replyMsg',
        populate : {
          path : 'owner'
        }
      })
    }

    io.to(projectId).emit('newMessageEvent', message)

    return res.status(200).json(message)
  } catch(err){
    next(err)
  }
}
export const ListMessages = async (req, res, next) => {
   try {
    const { projectId } = req.params

    const messages = await Message.find({
      project: projectId
    }).populate('owner').populate({
      path : 'replyMsg',
      populate : {
        path : 'owner'
      }
    }).sort({createdAt: -1})
    return res.status(200).json(messages)
  } catch(err){
    next(err)
  }
}