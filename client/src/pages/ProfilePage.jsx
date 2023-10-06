import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.jsx';
import { setCredentials } from '../slices/authSlice.js';
import { useUpdateUserMutation } from '../slices/usersApiSlice.js'

const ProfilePage = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [languagesSelected,setLanguagesSelected]=useState([]);

    const dispatch=useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const [updateprofile,{isLoading}]=useUpdateUserMutation();

    useEffect(()=>{
        setName(userInfo.name)
        setEmail(userInfo.email)
        setLanguagesSelected(userInfo.languages.map((elem)=>elem.languageName));
    },[userInfo.name, userInfo.email, userInfo.languages]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert("passwords do not match");
        }
        else{
            try {
                // let languages=languagesSelected.map((elem)=> elem.languageName.toLowerCase());
                let userData={_id: userInfo._id,name,email,password,languages: languagesSelected};
                const res=await updateprofile(userData).unwrap();
                dispatch(setCredentials({...res}));
            } catch (err) {
            }
        }
    }

    const languageOptions=["english", "hindi", "french", "japanese", "german", "russian"];

    function handleAddLanguage(lang){
      let found=languagesSelected.includes(lang);
      if(!found){
        setLanguagesSelected([...languagesSelected,lang]);
      }
    }

    function handleDeleteLanguage(lang){
      let found=languagesSelected.includes(lang);
      if(found){
        let newLang=languagesSelected.filter((elem)=> elem!== lang)
        setLanguagesSelected(newLang);
      }
    }

    return (
            <div className='form-container'>
            <h1>Profile</h1>

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
                    <label htmlFor="passowrd">Password</label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={ (e)=> setPassword(e.target.value) }
                    >
                    </input>
                    </div>

                    <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
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
                <h3>choose languages</h3>
                  {
                  languageOptions.map((lang)=>{
                    return (<button type='button' key={lang} onClick={()=>handleAddLanguage(lang)}>{lang}</button>)
                  })
                  }
                  </div>
                  <div className="form-group">
                <button type='submit'>Update</button>
                </div>
            </form>
            <h3>you have choosed</h3>
            <ul>
              {
              languagesSelected.map((lang) => (
              <li key={lang}>
                {lang}<button type='button' onClick={() => handleDeleteLanguage(lang)}>Delete</button>
              </li>))
              }
            </ul>
            </div>
    )
}

export default ProfilePage;