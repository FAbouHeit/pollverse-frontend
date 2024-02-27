import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../Utils/AxiosInstance';
import Styles from './Discover.module.css'
import { AuthContext } from '../../Context/AuthContext';

export default function Discover() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);
  const userId = user ? user.id : null;
  const fetchedLikedPosts = user ? user.likedPosts : null;
  const [likedPosts, setLikedPosts] = useState(fetchedLikedPosts);
  // const [likedPosts, setLikedPosts] = useState([]);
  

  const getPosts = async () => {
    try{
      setLoading(true);
      const response = await axiosInstance.get('/post/');
      setPosts(response.data);
      console.log(response.data);
    } catch (err){
      // setError(true);
      console.log("error: ", err);
    }
    setLoading(false);
  }

  useEffect(()=>{
    getPosts();
  },[])

  const getBackgroundColor = (postType) => {
    switch(postType){

      case 'twoChoice':
        return '#4478c7';
      case 'multiChoice':
        return '#8a188a';
      case 'quiz':
        return '#159115';
      case 'slider':
        return '#911717'
      default:
        return 'white';
    }
  }

  const handleLikeButton = async (e, index) =>{
    e.preventDefault();

    if(!likedPosts.includes(index)){
      const newArray = [...posts];
      newArray[index].likes +=1
      setPosts(newArray);
      const newLikedPostsArray = [...likedPosts, index];
      setLikedPosts(newLikedPostsArray);

      // try{
      await axiosInstance.post('/post/like', {userId: userId, postId: posts[index]._id});
      await axiosInstance.post('/user/add/like', {userId: userId, postId: posts[index]._id});
      // } catch (err) {
      //   console.log(err);
      // }
    } else {
      const newArray = [...posts];
      newArray[index].likes -=1
      setPosts(newArray);

      const postArray = [...likedPosts];
      const result = postArray.filter((element) => element !== index);
      setLikedPosts(result);

      await axiosInstance.post('/post/unlike', {userId: userId, postId: posts[index]._id});
      await axiosInstance.post('/user/remove/like', {userId: userId, postId: posts[index]._id});


    }
  }

  const handleCommentButton = async (e, index) =>{
    e.preventDefault();
    
  }

  const handleShareButton = async (e, index) =>{
    e.preventDefault();
    
  }

  return (
    <>
      {posts && posts.length > 0 && !loading ?
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
              onClick={(e) => handleLikeButton(e, index)}
              style={likedPosts.includes(index) ? {color: "#0f0cc6"} : {}}
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
      loading ? <p>loading</p>
      :
      <p>No posts!</p>
      }
    </>
  )
}
