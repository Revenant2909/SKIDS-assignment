import React, { useState } from 'react'
import "./user.css";
import { EmailOutlined, PermIdentity, Phone} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/apiCalls';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import User_Icon from "../../User_Icon.png"
export default function User() {
    const [userData,setUserData] = useState({});
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );
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
        updateUser(userId,userData,dispatch);
      }

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={User_Icon} alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.username}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">
                            Account Details
                        </span>
                        
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">
                            {user.username}
                            </span>
                        </div>
                        <span className="userShowTitle">
                            Contact Details
                        </span>
                        <div className="userShowInfo">
                            <Phone className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                +91 {user.phone}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <EmailOutlined className="userShowIcon" />
                            <span className="userShowInfoTitle">
                            {user.email}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit Details</span>
                    <form  className="userUpdateForm">
                        <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input type="text" name="username" placeholder={user.username} className='userUpdateInput'  onChange={handleChange} />
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" name="phone" placeholder={user.phone} className='userUpdateInput'  onChange={handleChange} />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="email" name="email" placeholder={user.email} className='userUpdateInput'  onChange={handleChange}/>
                        </div>
                            <button className="userUpdateButton" onClick={handleSubmit} >Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
