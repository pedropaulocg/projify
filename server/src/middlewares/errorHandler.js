export class AppError {
  message
  code

  constructor(code, message) {
    this.message = message
    this.code = code
  }
}


const ErrorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.code).json({
      success: false,
      status: err.code,
      message: err.message,
  })  
  }
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  return res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: err.stack
  })
}

export default ErrorHandler