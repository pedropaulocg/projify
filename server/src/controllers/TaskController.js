

export const storeTask = (req, res, next) => {
  try {
    const { name, description, board, project, creator, assigned, deadline } = req.body    
  } catch(err){
    next(err)
  }
}