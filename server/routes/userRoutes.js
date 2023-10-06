import express from "express";
const router=express.Router();

import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from "../controller/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,updateUserProfile);

export default router;
