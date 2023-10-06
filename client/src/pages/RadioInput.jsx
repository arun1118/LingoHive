import React, { useState } from 'react'

const RadioInput = ({ question, options, name, onChange }) => {
    const [selectedOption, setSelectedOption]=useState(null);

    const handleChange=(event)=>{
        setSelectedOption(event.target.value);
        onChange(event);
    };

    return(
    <div>
        <p>Question: {question}</p>
        {
        options.map((opt)=>{
            return (
                <><input type="radio" name={name} value={opt} checked={selectedOption === opt} onChange={handleChange} key={opt}/>{opt}</>
            )})
        }
        </div>
      );
}

export default RadioInput