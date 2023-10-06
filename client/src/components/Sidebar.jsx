import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice.js';
import { logout } from '../slices/authSlice.js';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const location=useLocation();    
    const dispatch=useDispatch();
    const {name}=useSelector((state)=>state.auth.userInfo);

    const [logoutApiCall]=useLogoutMutation();
    const navigate=useNavigate();

    const logoutHandler = async()=>{
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/')    
        }
        catch (error) {
            console.log(error);
        }
    }
    
    return (
      <div className='sidebar'>
        <h1>Lingo Hive</h1>
        <h3>Hi {name}</h3>
        <ul>
          <li><NavLink to='/learn' className={`${location.pathname === "/learn" ? "active" : ""}`}>Learn</NavLink></li>
          <li><NavLink to='/dashboard' className={`${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</NavLink></li>
          <li><NavLink to='/help' className={`${location.pathname === "/help" ? "active" : ""}`}>Help</NavLink></li>
          <li><NavLink to='/profile' className={`${location.pathname === "/profile" ? "active" : ""}`}>Profile</NavLink></li>
        </ul>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    )
}

export default Sidebar