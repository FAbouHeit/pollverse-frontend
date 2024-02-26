import React, { useState } from 'react';
import Styles from './QuizSection.module.css';
import { TextField } from '@mui/material';
import axiosInstance from '../../Utils/AxiosInstance';

export default function QuizSection({ pollNumber }) {
    const [optionsArray, setOptionsArray] = useState([
        { name: "", value: false },
        { name: "", value: false },
        { name: "", value: false },
        { name: "", value: false },
    ])
    const [errorChoice, setErrorChoice] = useState(null);

    const handleOptionChange = (index, e) => {
        const newArray = [...optionsArray];
        newArray[index].name = e.target.value
        setOptionsArray(newArray);
    };

    const handleAnswerSelector = (index, e) => {
        let newSelectedAnswer = e.target.value;
        const newArray = [...optionsArray];
        if(newSelectedAnswer === "true"){
            newSelectedAnswer = true;
        } else {
            newSelectedAnswer = false;
        }
        newArray[index].value = newSelectedAnswer;
        setOptionsArray(newArray);
    }

    const handleQuizSubmit = async (e) => {
        if(pollNumber === 3){
            e.preventDefault();
        }
        // Check if there's at least one correct option selected


        if(optionsArray.length !== 4){
            return;
        }

        setErrorChoice(null);

        for(let i=0; i < optionsArray.length; i++){
            const profanityFlag =  await axiosInstance.post('/profanity', { array: optionsArray[i].name.split(" ") }); 
            if(profanityFlag.data.answer){
                setErrorChoice(i);
                return;
            }
            if(optionsArray[i].name === ""){
                setErrorChoice(i);  
                return; 
            }
        }
        const hasCorrectOption = optionsArray.some(option => option.value === true);

        if(!hasCorrectOption){
            alert("Quiz must have at least one correct answer!")
            return;
        }

        console.log("array submitted: ", optionsArray);
    
    }

    return (
        <form onSubmit={handleQuizSubmit} className={Styles.twoChoiceForm}>
            {optionsArray.map((element, index) => {
                return (
                    <div key={index}>
                        <TextField
                            id={`option-${index}`}
                            value={element.name}
                            label={`Option ${index + 1}`}
                            variant="standard"
                            name={`option${index + 1}`}
                            onChange={(e) => handleOptionChange(index, e)}
                            className={Styles.MultiChoiceOption}
                            error = {errorChoice === index}
                        />
                        <select className={Styles.answerSelector} value={element.value} onChange={(e) => handleAnswerSelector(index, e)}>
                            <option value={"true"}>Correct</option>
                            <option value={"false"}>Incorrect</option>
                        </select>
                    </div>
                )
            })}

            <button type="submit" className={Styles.twoChoiceSubmit}>Create</button>
        </form>
    )
}
