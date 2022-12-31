import Img from "../assets/img.png";
import Attach from "../assets/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useContext, useState } from "react";
import {
   arrayUnion,
   doc,
   updateDoc,
   Timestamp,
   serverTimestamp,
} from "@firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

const Input = () => {
   const [text, setText] = useState("");
   const [image, setImage] = useState(null);
   const { currentUser } = useContext(AuthContext);
   const { data } = useContext(ChatContext);

   const handleSend = async () => {
      if (image) {
         const storageRef = ref(storage, uuid());

         await uploadBytesResumable(storageRef, image).then(() => {
            getDownloadURL(storageRef).then(async downloadURL => {
               await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                     id: uuid(),
                     text,
                     senderId: currentUser.uid,
                     date: Timestamp.now(),
                     image: downloadURL,
                  }),
               });
            });
         });
      } else {
         await await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
               id: uuid(),
               text,
               senderId: currentUser.uid,
               date: Timestamp.now(),
            }),
         });
      }
      await updateDoc(doc(db, "userchats", currentUser.uid), {
         [data.chatId + ".lastMessage"]: {
            text,
         },
         [data.chatId + ".date"]: serverTimestamp(),
      });
      setText("");
      setImage(null);
   };

   return (
      <div className="input">
         <input
            type="text"
            placeholder="Type something..."
            onChange={e => setText(e.target.value)}
            value={text}
         />
         <div className="send">
            <img src={Attach} alt="" />
            <input
               style={{ display: "none" }}
               type="file"
               id="file"
               onChange={e => setImage(e.target.files[0])}
            />
            <label htmlFor="file">
               <img src={Img} alt="img" />
            </label>
            <button onClick={handleSend}>Send</button>
         </div>
      </div>
   );
};

export default Input;
