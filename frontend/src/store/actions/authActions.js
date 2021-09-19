import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER ,GET_ERRORS} from '../actions/types'



export const loginUser = userData => dispatch => {
  
    return axios
       .post('/users/admin/login', userData  ,{
        validateStatus: (status) => {
          return true;  
             },
     })
       .then(res => {
         // Save to localStorage
         console.log(res)
         if(res.data.content != null  ){
         const { access_token,user } = res.data.content;
         console.log(access_token)
         // Set token to ls
         localStorage.setItem('jwtToken', access_token);
         // Set token to Auth header
         setAuthToken(access_token);
         localStorage.setItem('user' ,JSON.stringify(user) );
         // Decode token to get user data
         const decoded = jwt_decode(access_token);
     
         // Set current user
         dispatch(setCurrentUser(user));
         }
        return Promise.resolve(res.data)
       })
       .catch(err =>{
         console.log(err);
         if(err.response.data != null && err.response.data.validation){
           console.log(err.response.data);
           err= err.response.data
         }else{
           err = {"msg":"Something went wrong"}
         }
         dispatch({
           type: GET_ERRORS,
           payload: err
         })
         return Promise.reject(err)
       });
    
   };
   


   export const registerUser =  userData  => dispatch => {
    return axios
       .post('/users/admin', userData,{
        validateStatus: (status) => {
          return true;  
             },
     })
       .then(res =>{ 
          return Promise.resolve(res.data)
       })
       .catch(err =>{
         console.log(err)
   
         if(err.response.data != null && err.response.data.validation){
           console.log(err.response.data);
           err= err.response.data 
         }else{
           err = {"msg":"Something went wrong"}
         }
         dispatch({
           type: GET_ERRORS,
           payload: err
         })
         return Promise.reject(err)
       });
   };
   


   export const setCurrentUser = (decoded) => {
 
    console.log(decoded)
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    }
  }


  // Log user out
export const logoutUser = () => dispatch=> {
    console.log('here')
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };