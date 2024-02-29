import React, { useContext, useEffect, useState } from 'react'
import Styles from './TwoChoice.module.css'
import { AuthContext } from '../../../Context/AuthContext';
import axiosInstance from '../../../Utils/AxiosInstance';
import {motion} from 'framer-motion'

export default function TwoChoice({options, responses, postId}) {
  const [pollResponses, setPollResponses] = useState(0);
  const { user, loading, setUser } = useContext(AuthContext);


  useEffect(()=>{
    setPollResponses(responses);
    console.log("user in discover", user);
  },[])


  const handleAddResponse = async (optionIndex) =>{
    if(!loading && user){

      if(optionIndex === null || optionIndex===undefined){
        return console.log("error! option index not provided")
      }

    if(!user.respondedPosts.some((obj)=> obj.postId === postId)){
      const newResponse = {
        postId,
        optionIndex,
      }

      setUser({ ...user, respondedPosts: [...user.respondedPosts, newResponse] });
      setPollResponses((prev)=> prev+1);

      await axiosInstance.post("/user/add/response", {
        userId: user._id,
        postId,
        optionIndex,
      });

      await axiosInstance.post("/post/response", {
        userId: user._id,
        postId,
        index: optionIndex
      })

    } else {
      console.log("already responded!", user.respondedPosts)
      return;
    }
  }
  console.log("no user detected")
  }


  const pollVariants = {
    hidden: {
      x: -10,
      opacity: 0,
      width: 0,
    },
    visible: {
       x: 0,
      opacity: 1,
      width:"100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const getWidth = (responses) => {

  }

  return (
    <>{user && !loading ?
      <>
      {!user.respondedPosts.some((obj)=> obj.postId === postId) ?
      <div className={Styles.twoChoiceContainer}>
        <span className={Styles.responsesSpan}>{pollResponses} Responses</span>
        {options.map((option, index)=>{
          return (
            <div key={index} className={Styles.optionDiv} onClick={(()=>handleAddResponse(index))}>
              <span className={Styles.optionValue}>{option.value}</span>
            </div>
          )
        })}
      </div>
      :
      ////////////////////////////////////////////
      <div className={Styles.twoChoiceContainer}>
        <span className={Styles.responsesSpan}>{pollResponses} Responses</span>
        {options.map((option, index)=>{
          return (
            <div key={index} className={`${Styles.optionDiv} ${Styles.answered}`} onClick={(()=>handleAddResponse(index))}>
              <motion.div  
             
              className={Styles.answeredOptionDiv} 
              style={{width:`${(option.responses)*100/pollResponses}%` }}>
              </motion.div>
                <span className={Styles.optionValueAnswered}>{option.value}</span>
            </div>
          )
        })}
      </div>
      ///////////////////////////////////////////
      }
      </>
    :
    <p>loading...</p>
    }
    </>
  )
}
