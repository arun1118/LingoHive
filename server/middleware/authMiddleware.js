import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect=asyncHandler(async(req,res,next)=>{
    let token;
    token=req.cookies.jwt;
    if(token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_CODE);
            req.user=await User.findById(decoded.userId).select('-password');
            next();
        }
        catch(error){
            res.status(401);
            throw new Error("Invalid user! token not authorized");    
        }
    }
    else{
        res.status(401);
        throw new Error("Invalid user! token not authorized");    
    }
});

export {protect}