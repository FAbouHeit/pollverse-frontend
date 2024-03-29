import React from 'react'
import Styles from './Chatbox.module.css';
import ChatInput from '../ChatInput/ChatInput';
import ChatWindow from '../ChatWindow/ChatWindow';

export default function Chatbox({handleOpenChat, openChat, name, sendMessage, messages}) {
    const handleCloseChat = ()=> {
      handleOpenChat(openChat);
    }
  return (
    <section className={Styles.chatBoxContainer}>
        <div className={Styles.chatTop}>
            <p>{name || "friend"}</p>
            <button onClick={handleCloseChat}>close</button>
        </div>
        <ChatWindow messages={messages}/>
        <ChatInput sendMessage={sendMessage}/>
    </section>
  )
}
