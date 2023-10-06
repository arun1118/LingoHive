import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar.jsx";

const PrivateRoute = () => {
    
    const {userInfo}=useSelector((state)=>state.auth)

    return userInfo?(<><Sidebar /><Outlet /></>):<Navigate to='/login' replace />
}

export default PrivateRoute