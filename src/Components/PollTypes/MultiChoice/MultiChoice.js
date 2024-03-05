import React, { useContext, useEffect, useState } from 'react'
import Styles from './MultiChoice.module.css'
import { AuthContext } from '../../../Context/AuthContext';
import axiosInstance from '../../../Utils/AxiosInstance';
import {motion} from 'framer-motion'

export default function MultiChoice({options, responses, postId, posts, setPosts, postIndex}) {
  const [pollResponses, setPollResponses] = useState(0);
  const { user, loading, setUser } = useContext(AuthContext);


  useEffect(()=>{
    setPollResponses(responses);
  },[])

  useEffect(()=>{

    console.log("user: ", user);

  },[])



  const handleAddResponse = async (optionIndex, optionResponses) =>{

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

      const newposts = [...posts];
      newposts[postIndex].options[optionIndex].responses += 1;
      setPosts(newposts);


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

    } 
    else {
      console.log("already responded!", user.respondedPosts)
      return;
    }
  } 
  else {
    console.log("no user detected")
  }
  }


  const clearUserResponsesArray = async()=>{
    await axiosInstance.post("/user/remove/responses", {userId: user._id}).then().catch(()=>{
      console.log("errrror")
    })
  }



  return (
    <>{user && !loading ?
      <>
      <div className={Styles.twoChoiceContainer}>
        <span className={Styles.responsesSpan}>{pollResponses} Responses</span>
        {options.map((option, index)=>{

          const calculatedWidth = `${(option.responses / pollResponses) * 100}%`;
          return (
            <div key={index} className={`${Styles.optionDiv} ${user.respondedPosts.some((obj)=> obj.postId === postId) ? Styles.removeCursor : ""}`} onClick={(()=>handleAddResponse(index, option.responses))}>
              <>
              {user.respondedPosts.some((obj)=> obj.postId === postId) ? 
                <motion.div  
                initial={{width: 0}}
                animate={{width: calculatedWidth}}  
                transition={{delay:0.2}}
                  className={Styles.answeredOptionDiv} 
                >
                </motion.div>
                :<></>} 
                </>
              <span className={Styles.optionValue}>{option.value}</span>
            </div>
          )
        })}
      </div>
      {/* <button onClick={()=>clearUserResponsesArray()}>button</button> */}
      </>
    :
    <p>loading...</p>
    }
    </>
  )
}
