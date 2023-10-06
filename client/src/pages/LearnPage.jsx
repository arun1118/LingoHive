import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions,selectAllQuestions,getQuestionsStatus,getQuestionsError } from '../slices/questionSlice.js';
import { useUpdateUserMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';

const LearnPage = () => {
  
  const dispatch=useDispatch();
  const [updateprofile,{isLoading}]=useUpdateUserMutation();

  const {userInfo} = useSelector((state)=>state.auth);
  let languageOptions=userInfo?.languages;

  const allQuestions=useSelector(selectAllQuestions);
  const questionsStatus=useSelector(getQuestionsStatus);
  const questionsError=useSelector(getQuestionsError);

  // const questionMap=new Map();
  // if(allQuestions){
  //   allQuestions.forEach(elem => {
  //     let difficulty=elem.questionDifficulty;
  //     let ques=questionMap.get(difficulty) || [];
  //     ques.push(elem);
  //     questionMap.set(difficulty,ques);
  //   });
  //   // console.log("questions based on difficulty")
  //   // console.log(questionMap);
  // }

  const [currentlanguage,setCurrentLanguage]=useState("");
  const [userRating,setUserRating]=useState(0);
  const [testStart,setTestStart]=useState(false);
  const [selectedOptions,setSelectedoptions]=useState([]);
  const [score,setScore]=useState(0);

  let allQuestionBasedOnRating=allQuestions.filter((elem)=> elem.questionDifficulty===userRating+1);

  function handleFetchQuestions(){
    if(currentlanguage.length>1){
      dispatch(fetchQuestions(currentlanguage));
      setTestStart(true);
      setScore(0);
    }
  }

  function handleLanguageChange(e){
    setCurrentLanguage(e.target.value);
    if(e.target.value.length>1){
    if(userInfo?.languages){
      let currlang;
      userInfo.languages.forEach((elem)=>{
        if(elem.languageName===e.target.value){
          currlang=elem;
        }
      });
      setUserRating(currlang.currentRating);
    }
    }
  }

  function handleOptionSelection(e){
    // console.log(e.target.name,e.target.value);
    setSelectedoptions((prevOptions)=>{
      let newSelectedOptions=[...prevOptions];
      newSelectedOptions[e.target.name]=e.target.value;
      return newSelectedOptions;
    })
  }

  function handleSubmitTest(){
    if(selectedOptions.length!==allQuestionBasedOnRating.length){
      alert("kindly answer all question");
    }
    else{
      let scoreVal=0;
      for(var i=0;i<selectedOptions.length;i++){
        // console.log("comparing ",selectedOptions[i],allQuestionBasedOnRating[i].answer);
        if(selectedOptions[i]===allQuestionBasedOnRating[i].answer){
          scoreVal+=(userRating+1);
        }
      }
      setScore(scoreVal);
    }
  }

  let totalScore=(allQuestionBasedOnRating.length) * (userRating+1);

  async function handleRating(){
    let ratingChange=0;
    if(score<totalScore){
      ratingChange=userRating-1;
      if(ratingChange<0){
        ratingChange=0;
      }
    }
    else if(score===totalScore){
      ratingChange=userRating+1;
      if(ratingChange>5){
        ratingChange=5;
      }
    }
    let newLanguageRating=languageOptions.filter((elem)=>elem.languageName!==currentlanguage);
    // console.log("new lang rating ",newLanguageRating);
    let foundLang=languageOptions.filter((elem)=>elem.languageName===currentlanguage);
    let foundLangObj=foundLang[0];
    let newlangObj={...foundLangObj,currentRating: ratingChange};
    newLanguageRating.push(newlangObj);
    let userData={_id: userInfo._id,name: userInfo.name,email: userInfo.email,password: "",languages: newLanguageRating}
    const res=await updateprofile(userData).unwrap();
    // console.log("updated : ",res);
    dispatch(setCredentials({_id: userInfo._id,name: userInfo.name,email: userInfo.email,languages: newLanguageRating}));
    setTestStart(false);
    setUserRating(ratingChange);
  }


  return (
  <div className='content'>
    <div className="container">
      <div className="left-section">
        <div className="language-selection">
          <label htmlFor="language">Select Language</label>
          <select onChange={handleLanguageChange} id="language">
            <option value="">None</option>
            {
              languageOptions.map((elem)=>{
                return <option value={elem.languageName} key={elem.languageName}>{elem.languageName}</option>
              })
            }
          </select>
        </div>
        <button onClick={handleFetchQuestions}>Start test</button>
        <div className="questions">
        { currentlanguage && <p>current rating {userRating} ⭐</p>}
        {userRating===5?<><h3>You have reached the highest level!!</h3></> : 
        <>
        { testStart && allQuestionBasedOnRating.map((elem,idx)=>{
            return(
              <div key={idx}>
                <p>Question {idx+1}: {elem.questionDetail}</p>
                <div className="options">
                  {
                    elem.options.map((opt)=> <><input type='radio' name={idx} value={opt} key={opt} onChange={handleOptionSelection}/>{opt}</>)
                  }
                {/* {<RadioInput question={elem.questionDetail} options={elem.options} name={`Question-${idx}`} onChange={handleChange}/>} */}
                </div>  
              </div>
            )
          })
        }
        {allQuestionBasedOnRating.length===0 && <><h2>Questions will be added soon!</h2></>}
        {testStart && <button className="submit-button" onClick={handleSubmitTest}>Submit</button>}
        </>}
        </div>
      </div>
      <div className="right-section">
        <h2>Score</h2>
        <div className="points">--</div>
        {/* <p>{selectedOptions}</p> */}
        {testStart && <><p>{score} Out of {totalScore}</p> <button type='button' onClick={handleRating}>Evaluate Rating</button> </>}
      </div>
    </div>
  </div>
  )
}

export default LearnPage

// (opt)=> <label><input type="radio" name={opt} value={opt}/> {opt}</label> 