import React, {  useState } from "react";
import Styles from "./ChatInput.module.css";
import InputEmoji from "react-input-emoji";

export default function ChatInput({sendMessage}) {
  const [message, setMessage] = useState("");
 


  const handleSubmit = (e) => {
    if(e.preventDefault){
      e.preventDefault();
    }
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  };



  return (
     <form onSubmit={handleSubmit} className={Styles.inputForm}>
      <InputEmoji
      type="text"
        value={message}
        onChange={setMessage}
        borderRadius={5}
        cleanOnEnter
        onEnter={handleSubmit}
        placeholder="Type a message"
      />
      <button type="submit" className={Styles.sendButton} >
        Send
      </button>
    </form>
    
  );
}

