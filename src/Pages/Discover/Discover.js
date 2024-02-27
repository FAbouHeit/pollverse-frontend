import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../Utils/AxiosInstance';
import Styles from './Discover.module.css'
import { AuthContext } from '../../Context/AuthContext';

export default function Discover() {
  const [posts, setPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const { fetchUserData, user, loading,setUser } = useContext(AuthContext);
  // const [userId, setUserId] = useState(null);


  const getPosts = async () => {
    try {
      const response = await axiosInstance.get('/post/');
      setPosts(response.data);
    } catch (err) {
      console.log("error: ", err);
    }
    setPageLoading(false);
  }

useEffect(()=>{
  if (!loading && user){
    getPosts();
    console.log(user)

  } 
},[])

  const getBackgroundColor = (postType) => {
    switch (postType) {
      case 'twoChoice':
        return '#4478c7';
      case 'multiChoice':
        return '#8a188a';
      case 'quiz':
        return '#159115';
      case 'slider':
        return '#911717';
      default:
        return 'white';
    }
  }

  const handleLikeButton = async (e, id, index) => {
    e.preventDefault();

    // if (!loading && user && !likedPosts.includes(id)) {
    //   const newArray = [...posts];
    //   newArray[index].likes += 1;
    //   setPosts(newArray);
    //   const newLikedPostsArray = [...likedPosts, id];
    //   setLikedPosts(newLikedPostsArray);

    //   await axiosInstance.post('/post/like', { userId: user.id, postId: id });
    //   await axiosInstance.post('/user/add/like', { userId: user.id, postId: id });

    // } else if(user && !loading && likedPosts.includes(id)){
    //   const newArray = [...posts];
    //   newArray[index].likes -= 1;
    //   setPosts(newArray);

    //   const postArray = [...likedPosts];
    //   const result = postArray.filter((ele) => ele !== id);
    //   setLikedPosts(result);

    //   await axiosInstance.post('/post/unlike', { userId: user.id, postId: id });
    //   await axiosInstance.post('/user/remove/like', { userId: user.id, postId: id });

    // } else {
    //   console.log("wrong trigger state")
    // }

    if (!loading && user){
   

      if(!user.likedPosts.includes(id)){

        setUser({...user, likedPosts: [...user.likedPosts, id]});
     await axiosInstance.post('/post/like', { userId: user._id, postId: id });
      await axiosInstance.post('/user/add/like', { userId: user._id, postId: id });
       console.log("liked")
       console.log("user", user);
      }
      else{
        setUser({...user, likedPosts: user.likedPosts.filter((el)=> el !== id)});
            await axiosInstance.post('/post/unlike', { userId: user._id, postId: id });
    await axiosInstance.post('/user/remove/like', { userId: user._id, postId: id });
    console.log("unliked")

    console.log("user", user);
      }

    } 
    else{
      console.log("not loaded")
    }
  }

  const handleCommentButton = async (e, index) => {
    e.preventDefault();
  }

  const handleShareButton = async (e, index) => {
    e.preventDefault();
  }


  return (
    <>
  
      {posts && posts.length > 0 && !pageLoading ?
      posts.map((element, index)=>{
        return (
        <section key={index} className={Styles.onePost}>
          <section className={Styles.captionContainer} style={{backgroundColor: getBackgroundColor(element.type)}}>
            <p className={Styles.postCaption}>{element.caption}</p>
          </section>

          <div className={Styles.pollFigure}>
   
          </div>

          <menu className={Styles.menuContainer}>
            <li className={Styles.menuListItem}>
              <button 
              className={Styles.menuButton} 
              onClick={(e) => handleLikeButton(e, element._id, index)}
              style={user.likedPosts.includes(element._id) ? {color: "#0f0cc6"} : {}}
              >
                {element.likes} Like
              </button>
            </li> 
            <li className={Styles.menuListItem}>
              <button className={Styles.menuButton} onClick={(e) => handleCommentButton(e, index)}>
                {element.comments.length > 0 ? element.comments.length : ""} Comment
              </button>
            </li> 
            <li className={Styles.menuListItem}>
              <button className={Styles.menuButton} onClick={(e) => handleShareButton (e, index)}>
                Share
              </button>
            </li>
          </menu>
        </section>
        )
      })
      :
      pageLoading ? <p>pageLoading</p>
      :
      <p>No posts!</p>
      }
    </>
  )
}
