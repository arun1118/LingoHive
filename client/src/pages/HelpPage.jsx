import React from 'react'

const HelpPage = () => {
    return (
      <div className='content'>
        <h2>Step 1: Choose a language</h2>
        <p>Go to the Profile page and Add or Delete languages that you want to learn, then click Update</p>
        <h2>Step 2: Complete Task</h2>
        <p>Go to the Learn Page and then select the language for which you want to give the test</p>
        <h2>Step 3: Start test</h2>
        <h2>Step 4: Submit test</h2>
        <p>After answering all the questions, submit the test</p>
        <h2>Step 5: Evaluate Rating</h2>
        <p>To check you new rating click the evaluate rating button</p>

        <h3>Question pattern and Rating</h3>
        <ul>
        <li>Initially the rating will start from 0⭐ and it will go upto 5⭐</li>
        <li>There are questions of different levels, starting from difficulty level 1-5</li>
        <li>If a user is at rating X⭐, the questions will be asked of difficulty level (X+1)</li>
        <li>ex. If a user is at 0⭐ the question will be asked of difficulty level 1, and for 1⭐ the question difficulty will be of level 2, ans so on</li>
        <li>When the user submits a tests and click on 'Evaluate Rating', the new rating will be provided based on the score</li>
        </ul>
      </div>
    )
}

export default HelpPage