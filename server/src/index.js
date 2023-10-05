import express from "express";
import cors from 'cors'
import routes from "./routes/routesIndex.js";
import connectDB from "./Database/ConnectDB.js";
import ErrorHandler from "./middlewares/errorHandler.js";
import 'dotenv/config'
import fs from 'fs'
import { getGlobals } from 'common-es'
const { __dirname } = getGlobals(import.meta.url)
import path from "path"; 

const app = express()

const port = process.env.PORT || 3030
const folderName = path.join(__dirname, "../public");
const checkPublic = async () => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
};
await checkPublic();

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

