import React, { useEffect, useState } from 'react'
import Styles from './MultiChoiceSection.module.css'
import { TextField } from '@mui/material';
import axiosInstance from '../../Utils/AxiosInstance';

export default function MultiChoiceSection({pollNumber, handlePostSubmit}) {

    const [numberOfOptions, setNumberOfOptions] = useState(3);
    const [optionsArray, setOptionsArray] = useState(["", "", ""]);
    const [errorChoice, setErrorChoice] = useState(null);
    
    const handleOptionChange = (index, e) => {
        const newArray = [...optionsArray];
        newArray[index] = e.target.value
        setOptionsArray(newArray);
    };
    
    const handleMultiChoiceSubmit = async (e) =>{
        if(pollNumber ===2){
            e.preventDefault();
        }

        if(optionsArray.length < 3 || optionsArray.length > 10){
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

    const handleAddOption = (e)=>{
        e.preventDefault();
        if(numberOfOptions < 10 && numberOfOptions >=3){    
            setOptionsArray((prev)=> [...prev, ""])
            setNumberOfOptions((prev)=> prev+1);
        }
    }

    const handleDeleteOption = (index, e) => {
        e.preventDefault();
        if (numberOfOptions > 3) {
            if (index >= 0 && index < optionsArray.length) {
                const newOptionsArray = [...optionsArray]; // Create a copy of the array
                newOptionsArray.splice(index, 1); // Modify the copy
                setOptionsArray(newOptionsArray); // Update state with the modified copy
                setNumberOfOptions((prev)=> prev-1);

            }
        }
    };

    useEffect(()=>{
        setNumberOfOptions(optionsArray.length);
    },[optionsArray])

  return (
    <form onSubmit={handleMultiChoiceSubmit} className={Styles.twoChoiceForm}>
        {optionsArray.map((element, index)=>{
            return (
                <div>
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
            />
            <button onClick={(e) => handleDeleteOption(index,e)} disabled={numberOfOptions <= 3}>Delete</button>
            </div>
            )
        })}

        { numberOfOptions < 10 &&
            <button onClick={handleAddOption}>Add</button>
        }

        <button onClick={handleMultiChoiceSubmit}  className={Styles.twoChoiceSubmit}>Create</button>
    </form>
  )
}
