import { signOut } from "@firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseConfig";

const Navbar = () => {
   const { currentUser } = useContext(AuthContext);
   return (
      <div className="navbar">
         <span className="logo">Lama Chat</span>
         <div className="user">
            <img src={currentUser.photoURL} alt="avatar" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => signOut(auth)}>Log out</button>
         </div>
      </div>
   );
};

export default Navbar;
