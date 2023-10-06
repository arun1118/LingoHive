import mongoose from "mongoose";

const questionSchema=new mongoose.Schema({
    language:{
        type: String
    },
    difficulty:{
        type: Number
    },
    questionDetail:{
        type: String
    },
    answer:{
        type: String
    },
    options:[]
})

export default mongoose.model('Question',questionSchema)
