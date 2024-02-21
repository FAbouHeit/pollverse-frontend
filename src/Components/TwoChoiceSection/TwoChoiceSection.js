import React, { useState } from 'react'
import Styles from './TwoChoiceSection.module.css'
import { TextField } from '@mui/material';

export default function TwoChoiceSection({pollNumber}) {
    const [formData, setFormData] = useState({
        option1: "Yes",
        option2: "No"
    });

    
    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleTwoChoiceSubmit = (e) =>{
        if(pollNumber === 1){
            e.preventDefault();
            console.log("formData: " ,formData);
        }
    }


  return (
    <form onSubmit={handleTwoChoiceSubmit} className={Styles.twoChoiceForm}>
        <TextField id="standard-basic" 
        value={formData.option1} 
        label="Option 1" 
        variant="standard" 
        onChange={handleOptionChange} 
        name='option1'
        className={Styles.twoChoiceOption1}
        />
        <TextField 
        id="standard-basic" 
        value={formData.option2} 
        label="Option 2" 
        variant="standard" 
        onChange={handleOptionChange}
        name='option2'
        className={Styles.twoChoiceOption2}
        />
        <button onClick={handleTwoChoiceSubmit}  className={Styles.twoChoiceSubmit}>Create</button>
    </form>
  )
}
