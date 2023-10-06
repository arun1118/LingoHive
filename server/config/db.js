import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        // console.log(`mongoDB connected ${conn.connection.host}`)
        console.log("mongoDB connected")
    }
    catch(error) {
        console.log(`error in connecting database : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;