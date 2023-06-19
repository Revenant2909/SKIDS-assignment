import React from 'react'
import "./home.css";
import { useEffect, useMemo, useState } from "react";
import UserList from '../userList/UserList';

export default function Home() {
 

  return (
    <div className='home'>
    <UserList/>
    </div>
  )
}
