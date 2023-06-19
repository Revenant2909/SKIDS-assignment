import { publicRequest } from "../requestMethods";
import { getUsersFailure, getUsersStart, getUsersSuccess,deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserStart, updateUserSuccess, updateUserFailure, createUserStart, createUserSuccess, createUserFailure} from "./userRedux"


//Get Users                  Working
export const getUsers = async (dispatch) =>{
    dispatch(getUsersStart());
    try {
        const res = await publicRequest.get("/users");
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    };
};

//Delete User               Working
export const deleteUser = async (id,dispatch) =>{
    dispatch(deleteUserStart());
    try {
        const res = await publicRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailure());
    };
};


//Create User               
export const createUser = async (user,dispatch) =>{
    dispatch(createUserStart());
    try {
        const res = await publicRequest.post("/users/",user);
        dispatch(createUserSuccess(res.data));
    } catch (err) {
        dispatch(createUserFailure());
    };
};


//Update User
export const updateUser = async (id,user,dispatch) =>{
    dispatch(updateUserStart());
    try {
        const res =  await publicRequest.put(`/users/${id}`,user);
        dispatch(updateUserSuccess({id:id,user:user}));
    } catch (err) {
        dispatch(updateUserFailure());
    };
};