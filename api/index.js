import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGOSTR);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error)
    }
}

connectDB();
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})