import React, { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../Utils/AxiosInstance";
import Styles from "./Home.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { TextField } from "@mui/material";
import {motion} from 'framer-motion';
import defaultUserImage from '../../Static/defaultuser.png'
import dateConverter from '../../Utils/DateConverter.js'
import More from "../../Components/SVG/NavBarIcons/More";
import MultiChoice from "../../Components/PollTypes/MultiChoice/MultiChoice";
import Quiz from "../../Components/PollTypes/Quiz/Quiz";
import TwoChoice from "../../Components/PollTypes/TwoChoice/TwoChoice";
import Sliders from "../../Components/PollTypes/Sliders/Sliders";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [commentInputError, setCommentInputError] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [toggleReplies, setToggleReplies] = useState(null);
  const [toggleCommentSection, setToggleCommentSection] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openReport, setOpenReport] = useState(null);
  const [commenterName ,setCommenterName] = useState("");

  const reportRef = useRef(null);
  const reportButtonRef = useRef(null);
  



  const { user, loading, setUser } = useContext(AuthContext);

  const getPosts = async () => {
    try {
      const response = await axiosInstance.get("/post/");
      setPosts(response.data);
      // console.log(response.data);
      // console.log("post1 comments: ", response.data[0].comments);
    } catch (err) {
      console.log("error: ", err);
    }
    setPageLoading(false);
  };

  const handleClickOutside = (e) => {
      if (reportRef.current && !reportRef.current.contains(e.target) &&!reportButtonRef.current.contains(e.target)) {
        // if (!reportRef.current.contains(e.target)) {
      setOpenReport(null);
    }
  }

  useEffect(()=>{
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[]);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow on unmount
    };
  }, [openModal]);

  useEffect(() => {
    if (!loading && user) {
      getPosts();
      // console.log(user)
    }
  },[]);

  const getBackgroundColor = (postType) => {
    switch (postType) {
      case "twoChoice":
        return "#4478c7";
      case "multiChoice":
        return "#8a188a";
      case "quiz":
        return "#159115";
      case "slider":
        return "#911717";
      default:
        return "white";
    }
  };

  const handleLikeButton = async (e, id, index) => {
    e.preventDefault();

    if (!loading && user) {
      if (!user.likedPosts.includes(id)) {
        setUser({ ...user, likedPosts: [...user.likedPosts, id] });
        let newPosts = [...posts];
        newPosts[index].likes += 1;
        setPosts(newPosts);
        await axiosInstance.post("/post/like", {
          userId: user._id,
          postId: id,
        });
        await axiosInstance.post("/user/add/like", {
          userId: user._id,
          postId: id,
        });
        // console.log("liked")
        // console.log("user", user);
      } else {
        setUser({
          ...user,
          likedPosts: user.likedPosts.filter((el) => el !== id),
        });
        let newPosts = [...posts];
        newPosts[index].likes -= 1;
        setPosts(newPosts);
        await axiosInstance.post("/post/unlike", {
          userId: user._id,
          postId: id,
        });
        await axiosInstance.post("/user/remove/like", {
          userId: user._id,
          postId: id,
        });
        // console.log("unliked")
        // console.log("user", user);
      }
    } else {
      console.log("not loaded");
    }
  };

  const handleCommentButton = async (e, index) => {
    e.preventDefault();
    if(index !== toggleCommentSection){
      setToggleCommentSection(index);
    } else {
      setToggleCommentSection(null);
    }
  };

  const handleShareButton = async (e, index) => {
    e.preventDefault(); 
    setOpenModal(true);
  };


  const submitComment = async (postIndex, commentIndex) => {
    setCommentInputError(false);

    if (!commentInput) {
      return;
    } else {
      const profanityFlag = await axiosInstance.post("/profanity", {
        array: commentInput.split(" "),
      });
      if (profanityFlag.data.answer) {
        setCommentInputError(true);
        return;
      }
    }

    if (replyTo === null) {
      let newPosts = [...posts];
      let commentsArray = newPosts[postIndex].comments;
      let newComment = {
        userId: {
        id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },  
        text: commentInput,
        type: "comment",
        parentId: newPosts[postIndex]._id,
        replies: [],
        createdAt: Date.now()
      };
      commentsArray.push(newComment);
      newPosts[postIndex].comments = commentsArray;
      setPosts(newPosts);
      setCommentInput("");
      await axiosInstance.post("/comment/create", {
        userId: user._id,
        text: commentInput,
        type: "comment",
        parentId: newPosts[postIndex]._id,
      });
    } else {
      let newPosts = [...posts];
      let repliesArray = newPosts[postIndex].comments[commentIndex].replies;
      let newReply = {
        userId: user._id,
        text: commentInput,
        type: "reply",
        parentId: newPosts[postIndex].comments[commentIndex]._id,
        replies: [],
      };
      repliesArray.push(newReply);
      newPosts[postIndex].comments[commentIndex].replies = repliesArray;
      setPosts(newPosts);
      setCommentInput("");
      try{

        await axiosInstance.post("/comment/create", {
          userId: user._id,
          text: commentInput,
          type: "reply",
          parentId: newPosts[postIndex].comments[commentIndex]._id,
        });
      } catch (err) {
        return;
      }
      // console.log(newPosts[postIndex].comments)
      // console.log(newPosts[postIndex].comments[commentIndex])
      // console.log(newPosts[postIndex].comments[commentIndex].replies);
    }
    setReplyTo(null);
  };

  const handleViewReplies = (postIndex, commentIndex) => {
    const viewing = postIndex.toString() + commentIndex.toString();
    if (viewing !== toggleReplies) {
      setToggleReplies(postIndex.toString() + commentIndex.toString());
    } else {
      setToggleReplies(null);
    }
  };

  const getTotalNumberofComments = (index) => {
    let total = posts[index].comments.length;
    for (let i = 0; i < posts[index].comments.length; i++) {
      total += posts[index].comments[i].replies.length;
    }
    return total;
  };

  const handleOpenReportButton = (e, index) => {
    e.preventDefault();
    if(index !== openReport){
      setOpenReport(index)
    } else {
      setOpenReport(null);
    }

  }


  const getPoll = (type, options, responses, postId, postIndex)=> {
    switch (type){
      case "twoChoice": 
        return <TwoChoice options={options} responses={responses} postId={postId} posts={posts} setPosts={setPosts} postIndex={postIndex}/>;
      case "multiChoice": 
      return <MultiChoice options={options} responses={responses} postId={postId} posts={posts} setPosts={setPosts} postIndex={postIndex}/>;
      case "quiz": 
      return <Quiz options={options} responses={responses} postId={postId} posts={posts} setPosts={setPosts} postIndex={postIndex}/>;
      case "slider":
        return <Sliders options={options} responses={responses} postId={postId} posts={posts} setPosts={setPosts} postIndex={postIndex}/>;
      default:
        return; 
    }
  }

  const containerVariants = {
    hidden: {
      // y: -50,
      opacity: 0,
    },
    visible: {
      // y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "ease",
      },
    },
  };




  return (
    <>
      {posts && posts.length > 0 && !pageLoading ? (
        
        <>

{
  openModal &&
  <motion.div
  style={{
    top: `calc(50vh + ${window.scrollY}px)`,
    }}
    className={Styles.shareModal}
    onClick={(e) => e.stopPropagation()}
  >
    <div className={Styles.modalTop}>
    <p>Share</p>
    <p className={Styles.modalClose} onClick={()=>setOpenModal(false)}>X</p>
    </div>
    <div className={Styles.modalButtonsContainer}>
      <button>Copy Link</button>
      <button>My Wall</button>
    </div>
  </motion.div>
}
<>
  {openModal && (
    <div
      onClick={() => {setOpenModal(false)}}
      style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 99}}
    />
  )}
</>


        {posts.map((element, index) => {
          const postIndex = index;
          return (
            <section key={index} className={Styles.onePost}>
              <section className={Styles.postTopSection}>

              <div className={Styles.imageNameAndDate}>
                <img src={defaultUserImage} height={70} width={70} alt="userdefault" style={{borderRadius: "50%", border:"1px solid black"}}/>
                <div className={Styles.nameAndDate}>
                  <p>{posts[index].userId.firstName +" " + posts[index].userId.lastName}</p>
                  <span>{dateConverter(posts[index].createdAt)}</span>
                </div>
              </div>

              <div className={Styles.reportButtonParent} onClick={(e)=>handleOpenReportButton(e, index)}>
                <div ref={reportRef} className={Styles.reportButtonContainer}>
                  <More/>
                </div>
                  {/* <motion.div className={Styles.reportMenu} animate={openReport ===index ? {y:0, opacity:1} : {y:-10, opacity:0}}> */}
                  <motion.div className={Styles.reportMenu} animate={openReport ===index ? {opacity:1} : {opacity:0}}>
                  <ul >
                    <li ref={reportButtonRef} onClick={()=> {setOpenReport(false)}}>Report</li>
                  </ul>
                </motion.div>
              </div>
              </section>
              <section
                className={Styles.captionContainer}
                style={{ backgroundColor: getBackgroundColor(element.type) }}
              >
                <p className={Styles.postCaption}>{element.caption}</p>
              </section>

              <div className={Styles.pollFigure}>
                {getPoll(element.type, element.options, element.responses, element._id, postIndex)}
              </div>

              <menu className={Styles.menuContainer}>
                <li className={Styles.menuListItem}>
                  <button
                    className={Styles.menuButton}
                    onClick={(e) => {handleLikeButton(e, element._id, index)}}
                    style={
                      user.likedPosts.includes(element._id)
                        ? { color: "#0f0cc6" }
                        : {}
                    }
                  >
                    {element.likes} Upvotes
                  </button>
                </li>
                <li className={Styles.menuListItem}>
                  <button
                    className={Styles.menuButton}
                    onClick={(e) => {handleCommentButton(e, index)}}
                  >
                    {element.comments.length > 0
                      ? getTotalNumberofComments(postIndex)
                      : 0}{" "}
                    Comments
                  </button>
                </li>
                <li className={Styles.menuListItem}>
                  <button
                    className={Styles.menuButton}
                    onClick={(e) => {handleShareButton(e, index)}}
                  >
                    Share
                  </button>
                </li>
              </menu>
              { toggleCommentSection === index ? 
              <motion.section 
              className={Styles.commentSectionContainer}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              >
               <p className={Styles.commentContainerName}>Comments</p>
                <section className={Styles.allComments}>
                  { element.comments.map((comment, index) => {
                    return (
                      <div key={index} className={Styles.singleCommentContainer}>
                        <div className={Styles.singleCommentTop}>
                          <img src={defaultUserImage} alt="default" height={40} width={40}/>
                          <p className={Styles.commentName}>{posts[postIndex].comments[index].userId.firstName + " " + posts[postIndex].comments[index].userId.lastName}</p>
                          <span className={Styles.commentDate}>{dateConverter(posts[postIndex].comments[index].createdAt)}</span>
                        </div>
                          <p className={Styles.commentText}>{comment.text}</p>
                        <button className={Styles.replyButton} onClick={() => {setReplyTo(index); setCommenterName(posts[postIndex].comments[index].userId.firstName)}}>reply</button>
                        {comment.replies.length > 0 ? (
                          <button
                          className={Styles.viewButton}
                          onClick={() => {handleViewReplies(postIndex, index)}}
                          >
                            {toggleReplies !== postIndex.toString() + index.toString() ? "view replies" : "hide replies"}
                          </button>
                        ) : (
                          <></>
                        )}
                        {toggleReplies ===
                        postIndex.toString() + index.toString() ? (
                          <>
                            {comment.replies.map((reply, index) => {
                              return (
                              <div className={Styles.replyContainer}>
                                <div style={{display:"flex", alignItems:"center", width: "100%", gap:"5px"}}>
                                  <img src={defaultUserImage} height={30} width={30} alt="userdefault"/>
                                  <p><span style={{fontWeight: "bold"}}>{(reply.userId.firstName || user.firstName) +" "+ (reply.userId.lastName || user.lastName)}</span>  <span className={Styles.replySpan}> --replied</span></p>
                                </div>
                              <p key={index} style={{margin: "1rem"}}>{reply.text}</p>
                              </div>
                              );
                            })}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </section>
                <div>
                  {replyTo!==null ? <div>replying to {commenterName}</div> : <></>}
                  <div className={Styles.sendCommentContainer}>
                    <TextField
                      id="standard-basic"
                      sx={{
                        width: "80%"
                      }}
                      value={commentInput}
                      variant="outlined"
                      name={`comment ${index}`}
                      onChange={(e) => {setCommentInput(e.target.value)}}
                      className={Styles.commentInput}
                      error={commentInputError}
                      placeholder="Comment"
                      autoComplete="off"
                    />
                    <button className={Styles.sendButton} onClick={() => {submitComment(index, replyTo)}}>
                      Send
                    </button>
                  </div>
                </div>
              </motion.section>
              : 
               <></>}
            </section>
          );
        })
        
      }
      </>

    
      ) : pageLoading ? (
        <div style={{width: "100%", height:"100vh", position:"relative"}}>
        <span className={Styles.loader}>
          <HashLoader color="#0f0cc6" />
        </span>
        </div>
      ) : (
        <p>No posts!</p>
      )}



    </>
  );
}
