import React, { useState } from 'react'
import "./newUser.css";
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/apiCalls';
import { Alert } from '@mui/material';

export default function NewUser() {
  const [userData,setUserData] = useState({});

  const dispatch = useDispatch();
  
  const handleChange = (e)=>{
    const value = e.target.value;
    setUserData({...userData,[e.target.name]:value});
  }
  //Validation 
  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    return usernameRegex.test(username);
  }
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Phone number validation function
  function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
  

  const handleSubmit = (e) =>{
    e.preventDefault();
   if(!validateEmail(userData.email)){
      alert("Email is not valid!");
      return;
   };
    if(!validatePhoneNumber(userData.phone)){
      alert("Phone no. is not valid!");
      return;
    };
    if(!validateUsername(userData.username)){
      alert("Username is not valid!");
      return;
    };
    createUser(userData,dispatch);
  }




  return (
    <div className="newUser">
        <h1 className="newUserTitle">Create new user</h1>
        <form className="newUserForm">
            <div className="newUserItem">
                <label>Username</label>
                <input type="text" name="username" placeholder='Jsnow02' onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type="email" name="email" placeholder='jonsnow@gmail.com' onChange={handleChange} />
            </div>
            <div className="newUserItem">
                <label>Phone</label>
                <input type="text" name="phone" placeholder='+91 9876543210' onChange={handleChange} />
            </div>

            <button className="newUserButton" onClick={handleSubmit} > Create </button>
        </form>
    </div>
  )
}
