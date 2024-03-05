import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import defaultImage from '../../Static/defaultuser.png'
import axiosInstance from '../../Utils/AxiosInstance';
import Styles from './Chat.module.css'
import Chatbox from '../../Components/Chatbox/Chatbox';
import { HashLoader } from 'react-spinners';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_ENDPOINT);


export default function Chat() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [openChat, setOpenChat] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [friendsRooms, setFriendsRooms] = useState([]);

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

  useEffect(()=>{
    if(chatRoom){
      getMessages(chatRoom);
    } else {
      return
    }
  }, chatRoom)

  const handleOpenChat = async (index, fname, friendId) => {

    if(index !== openChat){
      setChatLoading(true);
      setOpenChat(index);
      setName(fname);
      getRoomId(friendId);

    } else{
      setMessages([]);
      setOpenChat(null);
      setName("");
      setChatRoom(null);
      console.log("messages at close: ", messages);
    }

    console.log("index: ",index)
    console.log("openchat: ",openChat)
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

  const getMessages = async(room) => {
    try{
      const res = await axiosInstance.post('/chat/get-room', {roomId: room})
        setMessages(res.data.chat);
       

      console.log("messages fetched: ", res.data.chat);
    } catch (err){
      console.log("error getting messages! ", err);
    }
    setChatLoading(false);
  }

  const sendMessage = async (text) => {
    const newMessage = { text: text, senderId: user._id, roomId: chatRoom, createdAt: ISODateFormat() }
    console.log("new message: ", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("message", text, chatRoom);
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

useEffect(()=>{
  if(user){
    let rooms = user.community.map(object => object.roomId);
    setFriendsRooms(rooms)
  }
},[])

useEffect(() => {
  socket.on("connection", () => {});

  for (let i = 0; i < friendsRooms.length; i++) {
    socket.emit("joinRoom", user.firstName, friendsRooms[i]);
  }

  socket.on("message", (data, room) => {
    console.log("a message was received!", data, room);
    setMessages((prevMessages) => [...prevMessages, { text: data, senderId: "other", roomId: room, createdAt: ISODateFormat() }]);
  });

  return () => {};
}, []);

  return (
    <>
    <aside className={Styles.asideContainer}>
      {friends.length > 0 && openChat==null ?
        <>
        <p className={Styles.myCommunity}>My Community</p>
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

      { openChat !== null && chatLoading === true ?
        <span className={Styles.loader}>
          <HashLoader color="#0f0cc6" />
        </span>
        : openChat !== null && chatLoading === false ?
        <Chatbox handleOpenChat={handleOpenChat} openChat={openChat} name={name} sendMessage={sendMessage} messages={messages}/>
        :
        <></>
      }
    </aside>

      
    </>
  )
}
