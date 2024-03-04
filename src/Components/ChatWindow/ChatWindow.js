import React, { useContext, useEffect, useState } from 'react'
import Styles from './ChatWindow.module.css'
import convertISOToDateTime from '../../Utils/DateConverter'
import { AuthContext } from '../../Context/AuthContext';

export default function ChatWindow({messages}) {
    const [myMessages, setMyMessages] = useState([]);
    const { user } = useContext(AuthContext);



    useEffect(() => {
      setMyMessages(messages || []);
    }, [messages]);

  return (
    <div className={Styles.chatContainer}>
      {myMessages.map((msg, index) => {
        return( 
        <div key={index} className={`${Styles.chatMessage} ${ msg.senderId !== user._id ? Styles.received : Styles.sent}`}>
           <p className={Styles.chatMessageText}>{msg.text}</p>
          <span className={Styles.chatMessageTime}>{convertISOToDateTime(msg.createdAt)}</span>
        </div>
        )
      })}
      <div className={Styles.anchor}></div>
    </div>
  )
}
