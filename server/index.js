import express from "express";
import cors from 'cors'
import routes from "./src/routes/routesIndex.js";
import connectDB from "./src/Database/ConnectDB.js";
import ErrorHandler from "./src/middlewares/errorHandler.js";
import 'dotenv/config'
import fs from 'fs'
import { getGlobals } from 'common-es'
const { __dirname } = getGlobals(import.meta.url)
import path from "path"; 
import bodyParser from "body-parser";
import http from 'http'
import { Server } from "socket.io";
const app = express()

app.use(cors())

const port = process.env.PORT || 3030
const folderName = path.join(__dirname, "./public");
const checkPublic = async () => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      console.log('public file created')
    }
  } catch (err) {
    console.error(err);
  }
};
await checkPublic();

connectDB()
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(routes)
// Create GET request
app.use('/public', express.static(path.join(__dirname, './public')));

app.use(ErrorHandler)
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
io.on('connection', (socket) => {
  console.log('Socket on')

  socket.on('join_room', data => {
    const { project, user } = data
    console.log(user + ' joined the room')
    socket.join(project)
  })
})
server.listen(port, () =>{
  console.log('Server listen on port ' + port)
})

