import React, { useContext, useEffect, useRef, useState } from 'react'
import Styles from './Create.module.css'
import TwoChoice from '../../Components/SVG/CreateBarIcons/TwoChoice'
import MultiChoice from '../../Components/SVG/CreateBarIcons/MultiChoice'
import Slider from '../../Components/SVG/CreateBarIcons/Slider'
import Quiz from '../../Components/SVG/CreateBarIcons/Quiz'
import defaultImage from '../../Static/defaultuser.png'
import TwoChoiceSection from '../../Components/TwoChoiceSection/TwoChoiceSection'
import MultiChoiceSection from '../../Components/MultiChoiceSection/MultiChoiceSection'
import QuizSection from '../../Components/QuizSection/QuizSection'
import SliderSection from '../../Components/SliderSection/SliderSection'
import { AuthContext } from '../../Context/AuthContext'
import axiosInstance from '../../Utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

export default function Create() {
  const [pollNumber, setPollNumber] = useState(1);
  const [isActiveTwoChoice, setIsActiveTwoChoice] = useState(true);
  const [isActiveMultiChoice, setIsActiveMultiChoice] = useState(false);
  const [isActiveQuiz, setIsActiveQuiz] = useState(false);
  const [isActiveSlider, setIsActiveSlider] = useState(false);
  const [pageLoading,setPageLoading] = useState(false);

  const pageOptions = ["Public", "Private"]
  const limitOptions = ["24hr", "unlimited"]
  const [selectedPage, setSelectedPage] = useState(pageOptions[0]);
  const [selectedLimit, setSelectedLimit] = useState(limitOptions[0]);

  const [textAreaFocused, setTextAreaFocused] = useState(false);

  const [inputValue , setInputValue] = useState("");
  const [inputValueProfanity, setInputValueProfanity] = useState(false);

  const articleRef = useRef(null);
  const textRef = useRef(null);

  const { user, fetchUserData } = useContext(AuthContext);
  const userId = user ? user._id : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);


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

  const colorPick = ()=>{
    switch(pollNumber){
      case 1:
        return "#4478c7"
      case 2:
        return "#8a188a"
      case 3:
        return "#159115" 
      case 4:
        return "#911717"
      default:
        return "#4478c7"

    }
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
    // textAreaRef.current.focus();
    // setIsEditable(true)
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= 120) {
      setInputValue(event.target.value );
    }
  };

  // const handleInputBlur = () => {
  //   // textAreaRef.current.blur();
  //   // setIsEditable(false);
  // };

  const handlePostSubmit = async (options) =>{
      setInputValueProfanity(false);
      
      if(!inputValue || inputValue === ""){
        return;
      }

      try{
      const profanityFlag =  await axiosInstance.post('/profanity', { array: inputValue.split(" ") }); 
      if(profanityFlag.data.answer){
          setInputValueProfanity(true);
          return;
      }

      setPageLoading(true);

      let type = "";

      switch(pollNumber){
        case 1: 
          type = "twoChoice" 
          break;
        case 2: 
          type = "multiChoice" 
          break;        
        case 3: 
          type = "quiz" 
          break;        
        case 4: 
          type = "slider" 
          break;
        default:
          break;
      }


      await axiosInstance.post('/post/create', { 
        userId,
        caption: inputValue,
        type,
        options,
        visibility: selectedPage.toLowerCase(),
        isSponsored: false,

      }); 
    } catch (err) {
      console.log("error: ", err);
    }
    setPageLoading(false);
    navigate('/discover');
  }


  return (
    <>
    {!pageLoading ?  
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
      <article ref={articleRef} className={Styles.createArticle} style={{backgroundColor: colorPick()}} onClick={handleInputClick}>
        <textarea type='text' 
        value={inputValue} 
        rows={5} 
        ref={textRef} 
        className={Styles.centeredText} 
        onChange={handleInputChange} 
        onFocus={()=>setTextAreaFocused(true)}
        placeholder={textAreaFocused ? "" : "What's on your mind?"}
        />
        <p className={Styles.capacity}>{inputValue.length}/120</p>
      </article>
        {inputValueProfanity && <p style={{color:"red"}}>Profanity is not allowed.</p>}

      {pollNumber === 1 && 
      <>
      <TwoChoiceSection pollNumber={pollNumber} handlePostSubmit={handlePostSubmit}/>
      </>
      }
      {pollNumber === 2 && 
      <>
      <MultiChoiceSection pollNumber={pollNumber} handlePostSubmit={handlePostSubmit}/>
      </>
      }
      {pollNumber === 3 && 
      <>
      <QuizSection pollNumber={pollNumber} handlePostSubmit={handlePostSubmit}/>
      </>
      }
      {pollNumber === 4 && 
      <>
      <SliderSection pollNumber={pollNumber} handlePostSubmit={handlePostSubmit}/>
      </>
      }

    </section>
    
    </section>
      :
      <div style={{width: "100%", height:"100vh", position:"relative"}}>
        <span className={Styles.loader}>
          <HashLoader color="#0f0cc6" />
        </span>
      </div>
    }
    </>
  )
}
