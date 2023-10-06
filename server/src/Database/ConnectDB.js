import mongoose from "mongoose";
import 'dotenv/config'


export default async function connectDB () {
  try {
    await mongoose.connect(`mongodb+srv://super:${process.env.DB_PASS}@projify2.ylpzsws.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
    console.log('Connected to the DB')
  } catch ( error ) {
    console.log(error);
    console.log('ERROR: Seems like your DB is not running, please start it up !!!');
  }
}