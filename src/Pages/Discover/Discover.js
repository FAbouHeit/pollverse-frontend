import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../Utils/AxiosInstance";
import Styles from "./Discover.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { TextField } from "@mui/material";
import {motion} from 'framer-motion';

export default function Discover() {
  const [posts, setPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [commentInputError, setCommentInputError] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [toggleReplies, setToggleReplies] = useState(null);
  const [toggleCommentSection, setToggleCommentSection] = useState(null);

  const { fetchUserData, user, loading, setUser } = useContext(AuthContext);

  const getPosts = async () => {
    try {
      const response = await axiosInstance.get("/post/");
      setPosts(response.data);
      console.log(response.data);
      // console.log("post1 comments: ", response.data[0].comments);
    } catch (err) {
      console.log("error: ", err);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    if (!loading && user) {
      getPosts();
      // console.log(user)
    }
  }, []);

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
  };

  const handleCommentInput = (e) => {};

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
        userId: user._id,
        text: commentInput,
        type: "comment",
        parentId: newPosts[postIndex]._id,
        replies: [],
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
        parentId: newPosts[postIndex]._id,
        replies: [],
      };
      repliesArray.push(newReply);
      newPosts[postIndex].comments[commentIndex].replies = repliesArray;
      setPosts(newPosts);
      setCommentInput("");
      await axiosInstance.post("/comment/create", {
        userId: user._id,
        text: commentInput,
        type: "reply",
        parentId: newPosts[postIndex].comments[commentIndex]._id,
      });
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

  const containerVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {posts && posts.length > 0 && !pageLoading ? (
        posts.map((element, index) => {
          const postIndex = index;
          return (
            <section key={index} className={Styles.onePost}>
              <section
                className={Styles.captionContainer}
                style={{ backgroundColor: getBackgroundColor(element.type) }}
              >
                <p className={Styles.postCaption}>{element.caption}</p>
              </section>

              <div className={Styles.pollFigure}></div>

              <menu className={Styles.menuContainer}>
                <li className={Styles.menuListItem}>
                  <button
                    className={Styles.menuButton}
                    onClick={(e) => handleLikeButton(e, element._id, index)}
                    style={
                      user.likedPosts.includes(element._id)
                        ? { color: "#0f0cc6" }
                        : {}
                    }
                  >
                    {element.likes} Upvote
                  </button>
                </li>
                <li className={Styles.menuListItem}>
                  <button
                    className={Styles.menuButton}
                    onClick={(e) => handleCommentButton(e, index)}
                  >
                    {element.comments.length > 0
                      ? getTotalNumberofComments(postIndex)
                      : 0}{" "}
                    Comment
                  </button>
                </li>
                <li className={Styles.menuListItem}>
                  <button
                    className={Styles.menuButton}
                    onClick={(e) => handleShareButton(e, index)}
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
                Comments
                <section className={Styles.allComments}>
                  {element.comments.map((comment, index) => {
                    return (
                      <div key={index}>
                        {comment.text}
                        <button onClick={() => setReplyTo(index)}>reply</button>
                        {comment.replies.length > 0 ? (
                          <button
                            onClick={() => handleViewReplies(postIndex, index)}
                          >
                            view replies
                          </button>
                        ) : (
                          <></>
                        )}
                        {toggleReplies ===
                        postIndex.toString() + index.toString() ? (
                          <>
                            {comment.replies.map((reply, index) => {
                              return <p key={index}>{reply.text}</p>;
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
                  {replyTo!==null ? <div>replying to {replyTo}</div> : <></>}
                  <div>
                    <TextField
                      id="standard-basic"
                      value={commentInput}
                      // label={`Response ${index+1}`}
                      variant="standard"
                      name={`comment ${index}`}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className={Styles.commentInput}
                      error={commentInputError}
                    />
                    <button onClick={() => submitComment(index, replyTo)}>
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
      ) : pageLoading ? (
        <p>pageLoading</p>
      ) : (
        <p>No posts!</p>
      )}
    </>
  );
}
