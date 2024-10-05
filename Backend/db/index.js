import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // .connect return a connection response
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(`\n Mongo DB connected !! DB Host `);
  } catch (error) {
    console.log("Mongo DB connection error!!", error);
    process.exit(1);
  }
};

export default connectDB;
