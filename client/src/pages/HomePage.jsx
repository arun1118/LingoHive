import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
const HomePage = () => {
  const {userInfo} = useSelector((state)=>state.auth);
    return (
      <>
      <Header />
      <div className='intro-card'>
        <h1>Home Page</h1>
        <p>
        Are you looking for a fun and easy way to learn a new language? Look no further!
        This language learning app is the perfect way to learn a new language at your own pace, in the comfort of your own home.
        Our app is based on a simple premise: answer simple questions to learn new vocabulary and grammar.
        We have a variety of languages to choose from, so you can learn the languages with ease.
        This app is the perfect way to learn a new language, whether you're a beginner or a seasoned language learner.
        So why wait? Login for a free account today and start learning!
        </p>
        {
          userInfo
          ?
          (
          <>
          <Link to='/learn'>Get Started....</Link>
          </>
          )
          :
          (
          <div className='header-button-container'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          </div>
          )
        }
      </div>
      </>
    )
}

export default HomePage