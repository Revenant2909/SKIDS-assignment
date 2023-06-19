import React from 'react'
import "./userList.css";
import { DataGrid} from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteUser, getUsers } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function UserList() {

    const dispatch = useDispatch();
    const[userData,setUserData] = useState([]);
    const users = useSelector(state=>state.user.users);
     useEffect(()=>{
        getUsers(dispatch);
        setUserData(users);
    },[]);
    
    
    const handleDelete = (id) =>{
        deleteUser(id,dispatch);
        setUserData(userData.filter(item=>item._id !==id));
    };
    
    
    const columns = [
        // { field: '_id', headerName: 'ID', width: 220 },
        { field: 'username', headerName: 'Username', width: 200},
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone No.', width: 200 },
        // {
        //   field: 'createdAt',
        //   headerName: 'Created At',
        //   width: 220,
        // },
        {
            field:"action",
            headerName:"Action",width:150,
            renderCell: (params)=> {
                return(<>
                <Link to={"/users/"+params.row._id}>
                    <button className="userListEdit">Edit</button>
                </Link>
                    <DeleteOutline className="userListDelete"
                     onClick={ ()=>handleDelete(
                        params.row._id
                    )}
                    />
                </>
                );
            }
        },
      ];
 
  return (
    <div className="userList">
         <DataGrid
        rows={userData} disableRowSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        getRowId={(row)=>row._id}
        checkboxSelection
      />
    </div>
  )
}
