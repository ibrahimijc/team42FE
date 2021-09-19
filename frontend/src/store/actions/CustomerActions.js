import axios from 'axios';

export const getCustomer = () => dispatch => {
    return axios
      .get('/users/client')
      .then((res ) => {
        console.log(res)
        return Promise.resolve(res.data)
      }).catch((err) => {
        console.log(err)
        return Promise.reject(err)
      })
  
  }

  export const deleteUser= (userData) => dispatch => {
  
    return axios
      .delete('/users/client', { data: userData })
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