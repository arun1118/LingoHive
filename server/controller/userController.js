import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

// -----------------------------------------------
// desc : login a user
// method : POST
// route : /users/login
// access: public
const loginUser=asyncHandler(async(req,res)=>{
    // console.log("request login backend");
    // console.log(req.body);
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            languages: user.languages
        });
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})



// -----------------------------------------------
// desc : register a user
// method : POST
// route : /users/register
// access: public
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const languages=[];

    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user=await User.create({
        name,email,password,languages
    });

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            languages: user.languages
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid user details");
    }
})


// -----------------------------------------------
// desc : logout a user
// method : POST
// route : /users/logout
// access: public
const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    
    res.status(200).json({message: 'user logged out'})
})


// -----------------------------------------------
// desc : get user profile
// method : GET
// route : /users/profile
// access: private
const getUserProfile=asyncHandler(async(req,res)=>{
    // console.log("request get profile user");
    const user={
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        languages: req.user.languages
    }
    res.status(200).json(user);
})


// -----------------------------------------------
// desc : update user profile
// method : PUT
// route : /users/profile
// access: private

const updateUserProfile=asyncHandler(async(req,res)=>{
    const oldUser=await User.findById(req.user._id);
    if(oldUser){
        oldUser.name=req.body.name || oldUser.name;
        oldUser.email=req.body.email || oldUser.email;
        if(req.body.password){
            oldUser.password=req.body.password;
        }
        if(req.body.languages){
            let newLangPrefRcvd=req.body.languages;
            let oldLangPref=oldUser.languages;
            // console.log("old : ",oldLangPref);
            // console.log("new pref : ",newLangPrefRcvd);

            let newLangPref=newLangPrefRcvd.map((elem)=>{
                let found=false;
                let langObj={};
                for(var i=0;i<oldLangPref.length;i++){
                    if(oldLangPref[i].languageName===elem){
                        found=true;
                        langObj=oldLangPref[i];
                        break;
                    }
                }
                if(!found){
                    langObj.languageName=elem;
                    langObj.totalPoints=0;
                    langObj.currentRating=0;
                    langObj._id=new mongoose.mongo.ObjectId();;
                }
                return langObj;
            });
            // console.log("new : ",newLangPref);
            oldUser.languages=newLangPref;
        }



        const updateduser=await oldUser.save();

        res.status(200).json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            languages: updateduser.languages
        });
    }
    else{
        res.status(404);
        throw new Error("User not found")
    }
})

// -------------------------------------------------------------------------------------------------

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};