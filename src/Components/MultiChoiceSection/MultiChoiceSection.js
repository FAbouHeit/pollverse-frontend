import React, { useEffect, useState } from 'react'
import Styles from './MultiChoiceSection.module.css'
import { TextField } from '@mui/material';

export default function MultiChoiceSection({pollNumber}) {

    const [numberOfOptions, setNumberOfOptions] = useState(3);
    const [optionsArray, setOptionsArray] = useState(["option1", "option2", "option3"]);

    
    const handleOptionChange = (index, e) => {
        const newArray = [...optionsArray];
        newArray[index] = e.target.value
        setOptionsArray(newArray);
    };
    
    const handleMultiChoiceSubmit = (e) =>{
        if(pollNumber ===2){
            e.preventDefault();
            console.log("array submitted: ", optionsArray);
        }
    }

    const handleAddOption = (e)=>{
        e.preventDefault();
        if(numberOfOptions < 10 && numberOfOptions >=3){    
            setOptionsArray((prev)=> [...prev, "newoption"])
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

    useEffect(()=>{
        console.log("number of options now: ", numberOfOptions);
    },[numberOfOptions])


  return (
    <form onSubmit={handleMultiChoiceSubmit} className={Styles.twoChoiceForm}>
        {optionsArray.map((element, index)=>{
            return (
                <div>
                <TextField 
                id="standard-basic" 
                key={index}
                value={element} 
                label="Option 1" 
                variant="standard" 
                name='option2'
                onChange={(e)=> handleOptionChange(index, e)}
                className={Styles.MultiChoiceOption}
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
