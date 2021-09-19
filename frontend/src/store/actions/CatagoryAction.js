import axios from 'axios';
import {SET_CURRENT_USER ,GET_ERRORS} from '../actions/types'


export const getCatagory= () => dispatch => {
    return axios
      .get('/templetes/category')
      .then((res ) => {
        console.log(res)
        return Promise.resolve(res.data)
      }).catch((err) => {
        console.log(err)
        return Promise.reject(err)
      })
  }

  export const deleteCategory= (categoryData) => dispatch => {
  
    return axios
      .delete('/category/', { data: categoryData })
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
        if (err.response.data != null && err.response.data.validation) {
          console.log(err.response.data);
          err = err.response.data
        } else {
          err = { "msg": "Something went wrong" }
        }  
        return Promise.reject(err)
      });
  }
  export const postCatagory =  catagoryData  => dispatch => {
    return axios
       .post('/category/', catagoryData,{
        validateStatus: (status) => {
          return true;  
             },
     } )
       .then(res =>{ 
           console.log(res.data)
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


  export const updateCatagory =  catagoryData  => dispatch => {
    return axios
       .put('/category/', catagoryData )
       .then(res =>{ 
           console.log(res.data)
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
