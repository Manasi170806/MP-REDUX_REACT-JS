import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../Slice/UserSlice'

export default function Home() {
  const dispatch = useDispatch();
  const { users, currentUser } = useSelector((state) => state.users);

  const handleFetchUsers = () => {
    dispatch(fetchUsers())
  }

  useEffect(() => {
    handleFetchUsers();
  }, []);

  console.log(currentUser);
  return (
    <div>
      <h1>Home Page</h1>
      <h2>{currentUser.email}</h2>
      <div>
        {
          users.map((user, index) => <p key={index}>{user.email}</p>)
        }
      </div>
    </div>
  );
}