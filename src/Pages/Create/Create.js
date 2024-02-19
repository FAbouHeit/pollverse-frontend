import React, { useState } from 'react'
import Styles from './Create.module.css'
import TwoChoice from '../../Components/SVG/CreateBarIcons/TwoChoice'
import MultiChoice from '../../Components/SVG/CreateBarIcons/MultiChoice'
import Slider from '../../Components/SVG/CreateBarIcons/Slider'
import Quiz from '../../Components/SVG/CreateBarIcons/Quiz'
import defaultImage from '../../DeleteAssets/logo512.png'

export default function Create() {
  const [pollNumber, setPollNumber] = useState(1);
  const [isActiveTwoChoice, setIsActiveTwoChoice] = useState(true);
  const [isActiveMultiChoice, setIsActiveMultiChoice] = useState(false);
  const [isActiveQuiz, setIsActiveQuiz] = useState(false);
  const [isActiveSlider, setIsActiveSlider] = useState(false);

  const pageOptions = ["Everyone", "Community"]
  const limitOptions = ["24hr", "unlimited"]
  const [selectedPage, setSelectedPage] = useState(pageOptions[0]);
  const [selectedLimit, setSelectedLimit] = useState(limitOptions[0]);

  const [inputValue , setInputValue] = useState("")
  const [isEditing, setIsEditing] = useState(false);



  const handlePollSelect = (number) => {
    setPollNumber(number);
    setIsActiveTwoChoice(false);
    setIsActiveMultiChoice(false);
    setIsActiveQuiz(false);
    setIsActiveSlider(false);

    switch (number) {
      case 1:
        setIsActiveTwoChoice(true);
        console.log("twochoice")
        break;
      case 2:
        setIsActiveMultiChoice(true);
        console.log("multichoice")

        break;
      case 3:
        setIsActiveQuiz(true);
        console.log("quiz")
        break;
      case 4:
        setIsActiveSlider(true);
        console.log("slider")
        break;
      default:
        break;
    
  };
  }

  const twoChoiceClass = [isActiveTwoChoice ? Styles.twoChoice : ""].join(' ');
  const multiChoiceClass = [isActiveMultiChoice ? Styles.multiChoice : ""].join(' ');
  const quizClass = [isActiveQuiz ? Styles.quiz : ""].join(' ');
  const sliderClass = [isActiveSlider ? Styles.slider : ""].join(' ');

  const handlePageSelectChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedPage(newSelectedOption);
  };


  const handleLimitSelectChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedLimit(newSelectedOption);
  };

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= 120) {
      setInputValue(event.target.value);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <section className={Styles.createContainer}>
      <h1 className={Styles.createTitle}>Choose poll type</h1>
      <menu className={Styles.createMenu}>

        <li className={twoChoiceClass} onClick={()=>handlePollSelect(1)}>
          <TwoChoice/>
          Two-Choice
        </li>
        <li className={multiChoiceClass} onClick={()=>handlePollSelect(2)}>
          <MultiChoice/>
          Multi-Choice
        </li>
        <li className={quizClass} onClick={()=>handlePollSelect(3)}>
          <Quiz/>
          Quiz
        </li>
        <li className={sliderClass} onClick={()=>handlePollSelect(4)}>
          <Slider/>  
          Slider
        </li>
      </menu>
    

    {pollNumber === 1 &&
    <section className={Styles.twoChoiceCreate}>
      <div className={Styles.createTopSection}>
          <div>
          <img  className={Styles.profilePicture} src={defaultImage} height={60} width={60} alt='profile-pic'/>
          <select  className={Styles.pageSelector} value={selectedPage} onChange={handlePageSelectChange}>
            {pageOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          </select>
          </div>
          <div>
          <select  className={Styles.pageSelector} value={selectedLimit} onChange={handleLimitSelectChange}>
            {limitOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          </select>
          </div>
      </div>
      <article className={Styles.createArticle} onClick={handleInputClick}>
      {isEditing ? (
        <div className={Styles.centeredInputContainer}>
      <textarea
        value={inputValue}
        maxLength={120}
        rows={1} // Set the number of visible rows as needed
        cols={12} // Set the number of visible columns as needed
        className={Styles.centeredInput}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        />
        </div>
      ): (
        <div className={Styles.centeredText}>{inputValue || <span style={{fontStyle:"italic", color:"#a7a7a7"}}>"What's on your mind?"</span>}</div>
      )}
      </article>
    </section>
    }
    </section>
  )
}
