import React, { useRef } from "react";
import { addUser } from '../Slice/UserSlice';
import { useDispatch, useSelector } from 'react-redux'
import { createChat } from '../Slice/chatSlice.js';
import { store } from '../Firebase/Firebase'
import { setDoc, collection, doc } from 'firebase/firestore'


export default function SignUp() {
  const { currentUser, users } = useSelector(state => state.users);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();

  const handleSignUp = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(addUser({ name, email, password }));
  }


  return (
    <div>

      <button onClick={async () => {
        dispatch(createChat());
        // await setDoc(doc(store, "cities", "LA"), {
        //   name: "Los Angeles",
        //   state: "CA",
        //   country: "USA"
        // });
      }}>Create Chat</button>



      <h1>Sign Up Page</h1>
      <h2>{currentUser.id}</h2>
      <input type="name" placeholder="Name" ref={nameRef} />
      <input type="email" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}