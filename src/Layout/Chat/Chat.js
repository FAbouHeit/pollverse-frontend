import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import defaultImage from '../../Static/defaultuser.png'
import axiosInstance from '../../Utils/AxiosInstance';
import Styles from './Chat.module.css'
import Chatbox from '../../Components/Chatbox/Chatbox';


export default function Chat() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [openChat, setOpenChat] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);

  const getFriends = async() => {
    if(user){
      try{
        const res = await axiosInstance.post('/user/friend', { userId: user._id});
        setFriends(res.data.communityFriends);
        console.log("friends: ", res.data.communityFriends);
      } catch (err) {
        console.log("error getting friends: ", err);
      }
    }
  }

  useEffect(()=>{
    getFriends();
  },[user])

  const handleOpenChat = async (index, fname, friendId) => {
    if(index !== openChat){
      setOpenChat(index);
      setName(fname);
      getRoomId(friendId);
      getMessages();
    } else {
      setMessages([]);
      setOpenChat(null);
      setName("");
      setChatRoom(null);
    }
  }


  function ISODateFormat() {
    const date = new Date;
    const isoString = date.toISOString();
    return isoString;
  }

  const getRoomId = async (friendId) => {
    try{
      const res = await axiosInstance.post('/user/get-room', {
        userId: user._id,
        friendId,
      })
      setChatRoom(res.data.roomId);
      console.log("room Id", res.data.roomId);
    } catch(err){
      console.log("error getting room id", err);
    }
  }

  const getMessages = async() => {
    try{
      const res = await axiosInstance.post('/chat/get-room', {
        roomId: chatRoom,
      })
      setMessages(res.data.chat);
      console.log("messages fetched: ", res.data.chat);
    } catch (err){
      console.log("error getting messages! ", err);
    }
  }

  const sendMessage = async (text) => {
    const newMessage = { text: text, senderId: user._id, roomId: chatRoom, createdAt: ISODateFormat() }
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // socket.emit("message", text, user.name);
    await axiosInstance.post('/chat/send', {
        roomId: chatRoom,
        senderId: user._id,
        text: text,
    }).then(()=>{
        console.log("user has sent a message! ", text);
    }).catch((err)=>{
        console.log("error sending a message...!!!", err);
    })
}

  return (
    <>
    <aside className={Styles.asideContainer}>
      {friends.length > 0 && openChat==null ?
        <>
        {friends.map((friend, index) => {
          return (
            <div key={index} className={Styles.friendContainer} onClick={()=>handleOpenChat(index, friend.firstName, friend._id)}>
              <img src={defaultImage} width={60} height={60} alt='default user'/>
              <p>{friend.firstName + " " + friend.lastName}</p>
            </div>       
          )
        })}
        </>
        : friends.length === 0 ?
        <p>no friends</p>
        :
        <></>
      }

      { openChat !==null &&
        <Chatbox setOpenChat={setOpenChat} name={name} sendMessage={sendMessage} messages={messages}/>
      }
    </aside>

      
    </>
  )
}
