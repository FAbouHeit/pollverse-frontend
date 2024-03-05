import React, { useState } from 'react'
import Styles from './TwoChoiceSection.module.css'
import { TextField } from '@mui/material';
import axiosInstance from '../../Utils/AxiosInstance';

export default function TwoChoiceSection({pollNumber, handlePostSubmit}) {
    const [optionsArray, setOptionsArray] = useState(["", ""]);
    const [errorChoice, setErrorChoice] = useState(null);

    
    
    const handleOptionChange = (index, e) => {
        const newArray = [...optionsArray];
        newArray[index] = e.target.value
        setOptionsArray(newArray);
    };
    
    const handleTwoChoiceSubmit = async (e) =>{
        if(pollNumber === 1){
            e.preventDefault();
        }

        if(optionsArray.length !== 2){
            return;
        }

        setErrorChoice(null);

        for(let i=0; i < optionsArray.length; i++){
            const profanityFlag =  await axiosInstance.post('/profanity', { array: optionsArray[i].split(" ") }); 
            if(profanityFlag.data.answer){
                setErrorChoice(i);
                return;
            }
            if(optionsArray[i] === ""){
                setErrorChoice(i);  
                return; 
            }
        }

        console.log("array submitted: ", optionsArray);
        handlePostSubmit(optionsArray);

    }


  return (
    <form onSubmit={handleTwoChoiceSubmit} className={Styles.twoChoiceForm}>
        {optionsArray.map((element, index)=>{
            return (
                <div key={index} style={{width:"100%"}}>
                <TextField 
                id="standard-basic" 
                key={index}
                value={element} 
                label={`Response ${index+1}`} 
                variant="standard" 
                name={`option ${index+1}`}
                onChange={(e)=> handleOptionChange(index, e)}
                className={Styles.MultiChoiceOption}
                error = {errorChoice === index}
                fullWidth
            />
            </div>
            )
        })}

        <button onClick={handleTwoChoiceSubmit}  className={Styles.twoChoiceSubmit}>Create</button>
    </form>
  )
}
