import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { HashLoader } from 'react-spinners';
import Styles from './Search.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axiosInstance from '../../Utils/AxiosInstance';
import _debounce from 'lodash/debounce';
import defaultImage from '../../Static/defaultuser.png'

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useContext(AuthContext);
  const [resultsArray, setResultsArray] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(()=>{
    console.log("user sent friend reqs: ",user)
  },[])

  const debouncedHandleSearchInput = _debounce(async (input) => {
    if (input) {
      try {
        const res = await axiosInstance.post('/search/', { searchText: input });
        console.log("output search: ", res.data);
        setResultsArray(res.data);
      } catch (error) {
        console.log('error in search! error: ', error);
      }
    }
    setLoading(false);
  }, 2000);

  const handleSearchInput = (e) => {
    setResultsArray([]);
    setLoading(true);
    setSearchInput(e.target.value);
    return debouncedHandleSearchInput(e.target.value);
  };

  const handleAddfriend =async (friendId)=>{
    try{
      // let friendReqArray = user.friendReqSent;
      // friendReqArray.push(friendId);
      user.friendReqSent.push(friendId);
      setRerender(!rerender); 
      await axiosInstance.post('/user/friend/request', {
        userId: user._id,
        friendId,
      });
    } catch (error){
      console.log("error sending friend req: ", error);
    }

  }

  const handleCancelFriendReq = async (friendId) => {
    try {
      let friendReqArray = user.friendReqSent; // Make sure to declare it using 'let' as it will be reassigned
      friendReqArray = friendReqArray.filter((id) => id !== friendId); // Reassign the filtered array
      user.friendReqSent = friendReqArray;
      await axiosInstance.post('/user/friend/cancel-request', {
        userId: user._id,
        friendId,
      });
      setRerender(!rerender); // 
    } catch (error) {
      console.log("error cancelling friend req: ", error);
    }
  
  }

  const handleDeclineFriendRequest = async (friendId) => {
    try{

      let userReqReceived = user.friendReqReceived;
      userReqReceived = userReqReceived.filter((id) => id !== friendId);
      user.friendReqReceived = userReqReceived;

      await axiosInstance.post('/user/friend/decline', {
        userId: user._id,
        friendId,
      })
      setRerender(!rerender); // 
    } catch (error) {
      console.log(error);
    }
  }

  const handleAcceptFriend = async(friendId) =>{
    try{

      await axiosInstance.post('/user/friend/add', {
        userId: user._id,
        friendId,
      })
      setRerender(!rerender);
    } catch(err){
      console.log(err);
    }
  }
  

  return (
    <aside className={Styles.searchContainer}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        onChange={handleSearchInput}
        disabled={!user}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          ),
        }}
      />
      {loading && searchInput ? (
        <span className={Styles.loader}>
          <HashLoader color="#0f0cc6" />
        </span>
      ): 
      
      <>
      { resultsArray.length > 0 ?
        <menu className={Styles.searchMenu}>
          {resultsArray.map((item, index)=>{
            return (
              <li key={index} className={Styles.searchItem}>
                <div className={Styles.searchItemInfo}>
                  <img src={defaultImage} width={50} height={50} />
                  <span>{item.firstName + " " + item.lastName}</span>
                </div>
                <div  className={Styles.searchButtons}>
                  { user.community.some((obj) => obj.friendId === item._id) ? 
                  <span>friend</span> 
                  : user.friendReqSent.includes(item._id) ?
                    <button onClick={() =>handleCancelFriendReq(item._id)}> Cancel friend request</button>
                    : user.friendReqReceived.includes(item._id) ?
                      <>
                        <button onClick={()=>handleAcceptFriend(item._id)}>yes</button>
                        <button onClick={()=> handleDeclineFriendRequest(item._id)}>no</button>
                      </>
                      : user._id !== item._id && !user.friendReqSent.includes(item._id)?
                        <button onClick={()=> handleAddfriend(item._id)}>Add</button>
                        : <span>you</span>
                  }
                </div>
              </li>
            )
          })}
        </menu>
        : !loading && searchInput ?
        <p>no results</p>
        :
        <></>
      }
      </>}
    </aside>
  );
}