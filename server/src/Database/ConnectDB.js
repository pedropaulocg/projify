import mongoose from "mongoose";


export default async function connectDB () {
  try {
    await mongoose.connect('mongodb://127.0.0.1/projifyDB')
    console.log('Connected to the DB')
  } catch ( error ) {
    console.log(error);
    console.log('ERROR: Seems like your DB is not running, please start it up !!!');
  }
}