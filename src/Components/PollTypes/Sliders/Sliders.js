import React, { useContext, useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import Styles from "./Sliders.module.css"
import { AuthContext } from '../../../Context/AuthContext';
import axiosInstance from '../../../Utils/AxiosInstance';

export default function Sliders({ options, responses, postId, posts, setPosts, postIndex }) {

  const [pollResponses, setPollResponses] = useState(0);
  const { user, loading, setUser } = useContext(AuthContext);

  const [sliderValue, setSliderValue] = useState(50);
  const [sliderDisabled, setSliderDisabled] = useState(false);
  const [sliderCommitted, setSliderCommitted] = useState(false);

  
  useEffect(()=>{
    setPollResponses(responses);
  },[])

  const calculateAverage = () => {
    return Math.floor((posts[postIndex].options[0].responses)/posts[postIndex].responses);
  };

  const handleSliderChange = (event, value) => {
    setSliderValue(value); 
    setSliderCommitted(false); 
  };

  const handleSliderChangeCommitted = async () => {

    if(!loading && user){

      if(!user.respondedPosts.some((obj)=> obj.postId === postId)){
        setSliderCommitted(true); 
        setSliderDisabled(true); 

        const newResponse = {
          postId,
          optionIndex: 1,
        }

        setUser({ ...user, respondedPosts: [...user.respondedPosts, newResponse] });
        setPollResponses((prev)=> prev+1);

        const newposts = [...posts];
        newposts[postIndex].options[0].responses += sliderValue;
        setPosts(newposts);

        await axiosInstance.post("/user/add/response", {
          userId: user._id,
          postId,
          optionIndex: 1,
        });
  
        await axiosInstance.post("/post/response", {
          userId: user._id,
          postId,
          index: 1
        })



      } else {
      console.log("already responded!", user.respondedPosts)
      return;
      }
    } else {
      console.log("no user detected!");
    }

  };

  return (
    <>
      <div style={{width:"90%", margin:"auto", marginTop:"20px"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <span>{options[0].value}</span>
            <span>{options[1].value}</span>
        </div>

      <Slider
        // defaultValue={50}
        min={Math.min(options[0].number)}
        max={Math.max(options[1].number)}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={sliderValue}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
        disabled={sliderDisabled || user.respondedPosts.some((obj)=> obj.postId === postId)}
      />

      <div style={{margin:"30px 0", fontWeight:"bold", fontSize:"1.2rem"}}>Average: {sliderCommitted || user.respondedPosts.some((obj)=> obj.postId === postId) ? <span className={Styles}>{calculateAverage()}</span> : "slide to see"} </div>
      {/* {sliderCommitted && <div style={{margin:"30px 0"}}>Average: {calculateAverage()}</div>} */}
      </div>
    </>
  );
}
