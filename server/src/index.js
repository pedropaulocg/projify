import express from "express";
import cors from 'cors'
import routes from "./routes/routesIndex.js";
import connectDB from "./Database/ConnectDB.js";
import ErrorHandler from "./middlewares/errorHandler.js";
import 'dotenv/config'

const app = express()

const port = process.env.PORT || 3030

app.use(cors())
connectDB()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)
app.use('/public', express.static('public/'));

app.use(ErrorHandler)
app.listen(port, () =>{
  console.log('Server listen on port ' + port)
})

