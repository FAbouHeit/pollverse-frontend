import React, { useState } from 'react';
import Styles from './QuizSection.module.css';
import { TextField } from '@mui/material';

export default function QuizSection({ pollNumber }) {
    const [optionsArray, setOptionsArray] = useState([
        { name: "one", value: "true" },
        { name: "two", value: "false" },
        { name: "three", value: "false" },
        { name: "four", value: "false" },
    ])

    const handleOptionChange = (index, e) => {
        e.preventDefault();
        // Handle option change if needed
    }

    const handleAnswerSelector = (index, e) => {
        const newSelectedAnswer = e.target.value;
        const newArray = [...optionsArray];
        newArray[index].value = newSelectedAnswer;
        setOptionsArray(newArray);
    }

    const handleQuizSubmit = (e) => {
        if(pollNumber === 3){
        e.preventDefault();

        // Check if there's at least one correct option selected
        const hasCorrectOption = optionsArray.some(option => option.value === "true");

        if (hasCorrectOption) {
            console.log(optionsArray);
            // Proceed with form submission
        } else {
            alert("Please select at least one correct option.");
        }
    }
    }

    return (
        <form onSubmit={handleQuizSubmit} className={Styles.twoChoiceForm}>
            {optionsArray.map((element, index) => {
                return (
                    <div key={element.name}>
                        <TextField
                            id={`option-${index}`}
                            value={element.name}
                            label={`Option ${index + 1}`}
                            variant="standard"
                            name={`option${index + 1}`}
                            onChange={(e) => handleOptionChange(index, e)}
                            className={Styles.MultiChoiceOption}
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
