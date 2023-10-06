import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
import connectDB from './config/db.js';

connectDB();

const app=express();
app.use(express.json()); //receive data
app.use(express.urlencoded({extended: true})); // send data
app.use(cookieParser());

app.use('/user',userRoutes);
app.use('/question',questionRoutes);

app.get('/',(req,res)=>{
    res.send("<h1>Backend running fine</h1>")
})

app.use(notFound)
app.use(errorHandler);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});