import multer from 'multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname.split(' ').join(''))
  }
})

const upload = multer({storage})

export default upload

