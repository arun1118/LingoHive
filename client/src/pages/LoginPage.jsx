import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice.js'
import { setCredentials } from '../slices/authSlice.js'
import Loader from '../components/Loader.jsx';
import Header from '../components/Header.jsx';

const LoginPage = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/learn');
        }
    },[navigate,userInfo]); // need to give the dependencies that are used inside or else there is a warning

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const res=await login({email,password}).unwrap();
            console.log("res after login : ",res);
            dispatch(setCredentials({...res}));
            navigate('/help');
        } catch (err) {
            console.log("error in login!")
            console.log(err?.data?.message || err.error);
        }
    }
    
    return (
      <>
      <Header />
      <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
        <label htmlFor="email">Email Id</label>
        <input
          type='email'
          placeholder='Enter Email Id'
          value={email}
          onChange={ (e)=> setEmail(e.target.value) }
          >
        </input>
        </div>
        
        <div className="form-group">
        <label htmlFor='password' style={{cursor:'pointer'}}> Password</label>
        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={ (e)=> setPassword(e.target.value) }
          >
        </input>
        </div>
        
        {isLoading && <Loader />}

        <div className="form-group">
        <button type='submit'>Login</button>
        </div>

        <div className="form-group">
        <p> Create an account? <Link to='/register'>Register</Link></p>
        </div>
        </form>
      </div>
      </>
    )
}

export default LoginPage;