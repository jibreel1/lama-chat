import { doc, onSnapshot } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebaseConfig";
import Message from "./Message";

const Messages = () => {
   const [messages, setMessages] = useState([]);
   const { data } = useContext(ChatContext);

   useEffect(() => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), doc => {
         doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
         unsub();
      };
   }, [data.chatId]);

   return (
      <div className="messages">
         {messages.map(mess => (
            <Message message={mess} key={mess.id} />
         ))}
      </div>
   );
};

export default Messages;
