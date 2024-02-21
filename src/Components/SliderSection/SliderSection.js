import { Slider, TextField } from '@mui/material'
import React, { useState } from 'react'
import Styles from './SliderSection.module.css'

export default function SliderSection({pollNumber}) {
    const [optionsArray, setOptionsArray] = useState([{name: "one", value: 0},{name: "two", value: 100}])
    const [numberError, setNumberError] = useState(false); 
    const marks = [
        {
          value: 0,
          label: '0°C',
        },
        {
          value: 20,
          label: '20°C',
        },
        {
          value: 37,
          label: '37°C',
        },
        {
          value: 100,
          label: '100°C',
        },
      ];

      const handleOptionChange = (index, e) => {
        e.preventDefault();
        const newArray = [...optionsArray]; // Create a new array
        newArray[index].name = e.target.value; // Update the value
        setOptionsArray(newArray); // Set the state with the new array
    }

    const handleNumberChange = (index, e)=>{
       
        const newValue = e.target.value;
        const newArray = [...optionsArray];
        newArray[index].value = newValue;
        setOptionsArray(newArray);
        if(
            optionsArray[1].value
            && optionsArray[0].value
            && Number(optionsArray[1].value) <= Number(optionsArray[0].value)
            ){
             setNumberError(true);
            } else {
                setNumberError(false);
            }
    }

    const handleQuizSubmit = (e)=>{
        if(pollNumber===4 && !numberError){
        e.preventDefault();
        console.log("QuizArray: ", optionsArray);
        }
    }

  return (
    <>
    <form onSubmit={handleQuizSubmit}>
        <div>
            <TextField 
            id="standard-basic" 
            value={optionsArray[0].name} 
            label="Option 1" 
            variant="standard" 
            onChange={(e)=>handleOptionChange(0, e)} 
            name='option1'
            className={Styles.twoChoiceOption1}
            />
            <TextField
            id="outlined-number"
            label="Number"
            type="number"
            variant="standard"
            value={optionsArray[0].value}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(e)=>handleNumberChange(0, e)}
            />
        </div>
        <div>
            <TextField 
            id="standard-basic" 
            value={optionsArray[1].name} 
            label="Option 2" 
            variant="standard" 
            onChange={(e)=>handleOptionChange(1, e)} 
            name='option2'
            className={Styles.twoChoiceOption2}
            />
            <TextField
            id="outlined-number"
            label="Number"
            type="number"
            variant="standard"
            value={optionsArray[1].value}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(e)=>handleNumberChange(1, e)}
            error={numberError}
            />
        </div>
        <button onClick={handleQuizSubmit}>Create</button>
    </form>
    <section>
        <h3>Preview</h3>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <span>{optionsArray[0].name}</span>
            <span>{optionsArray[1].name}</span>
        </div>
    <Slider 
    defaultValue={50} 
    min={Math.min(optionsArray[0].value, optionsArray[1].value)} 
    max={Math.max(optionsArray[0].value, optionsArray[1].value)}  
    aria-label="Default" 
    valueLabelDisplay="auto"
    marks={[{value:((optionsArray[1].value - optionsArray[0].value)/5 + optionsArray[0].value), label:"average"}]}
    />
    </section>
    </>
  )
}