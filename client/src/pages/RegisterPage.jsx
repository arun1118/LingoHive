import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.jsx';
import { useRegisterMutation } from '../slices/usersApiSlice.js'
import { setCredentials } from '../slices/authSlice.js'
import Header from '../components/Header.jsx';

const RegisterPage = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const [register,{isLoading}]=useRegisterMutation()

    useEffect(()=>{
        if(userInfo){
            navigate('/learn');
        }
    },[navigate,userInfo]);



    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
          alert("passwords do not match");
        }
        else{
            try {
                const res=await register({name,email,password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/help');
            } catch (err) {
                console.log("error in register!")
                console.log(err?.data?.message || err.error);
            }
        }
    }

    return (
      <>
      <Header />
        <div className='form-container'>
            <h1>Register</h1>

            <form onSubmit={submitHandler}>

              <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type= 'text'
                placeholder='Enter Name'
                value={name}
                onChange={ (e)=> setName(e.target.value) }
                >
              </input>
              </div>
              
              <div className="form-group">
              <label htmlFor="email">Email Id</label>
              <input
                type= 'email'
                placeholder='Enter Email Id'
                value={email}
                onChange={ (e)=> setEmail(e.target.value) }
                >
              </input>
              </div>

              <div className="form-group">
              <label htmlFor="password" style={{cursor:'pointer'}}>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={ (e)=> setPassword(e.target.value) }
              >
              </input>
              </div>

              <div className="form-group">
              <label htmlFor='confirmPassword' style={{cursor:'pointer'}}>Confirm Password</label>
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={ (e)=> setConfirmPassword(e.target.value) }
              >
              </input>
              </div>
              
              {isLoading && <Loader />}

              <div className="form-group">
              <button type='submit'>Register</button>
              </div>

              <div className="form-group">
              <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </form>
        </div>
        </>
    )
}

export default RegisterPage