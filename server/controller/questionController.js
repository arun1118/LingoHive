import Question from "../models/questionModel.js";
// import mongoose from "mongoose";

export const getAllQuestions=async (req,res)=>{
    try {
        const data=await Question.find({});
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

// export const addProblem=async(req,res)=>{
//     try {
//         const data=await Problem.create(req.body);
//         res.status(200).json({data});
//     } catch (error) {
//         res.status(500).json({msg : error})
//     }
// }

export const getAllQuestionsOneLanguage=async (req,res)=>{
    try {
        let {languageSelected}=req.params;
        const data=await Question.find({language: languageSelected});
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

// export const getSingleQuestion=async(req,res)=>{
//     try {
//         let questionId=req.params;
//         let questionIdObj = new mongoose.Types.ObjectId(questionId);
//         const data=await Question.findById(questionId);
//         res.status(200).json({data});
        
//     } catch (error) {
//         res.status(500).json({msg : error.message})
//     }
// }

// export const updateProblem=async(req,res)=>{
//     try {
//         let problemId=req.params.problemId;
//         let problemIdObj = new mongoose.Types.ObjectId(problemId);
//         const problemData=req.body;
//         const data=await Problem.findByIdAndUpdate(problemIdObj, problemData,{new: true})
//         res.status(200).json({data});
        
//     } catch (error) {
//         res.status(500).json({msg : error.message})
//     }
// }

// export const deleteProblem=async(req,res)=>{
//     try {
//         let problemId=req.params.problemId;
//         let problemIdObj = new mongoose.Types.ObjectId(problemId);
//         const data=await Problem.findByIdAndDelete(problemIdObj)
//         res.status(200).json({data});
        
//     } catch (error) {
//         res.status(500).json({msg : error.message})
//     }
// }


