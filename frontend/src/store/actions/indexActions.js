import axios from 'axios';

export const getAllIndexes = (currencyCode) => dispatch => {
    return axios
      .get('/currency/' + currencyCode)
      .then((res) => {
        console.log(res)
  
        return Promise.resolve(res.data)
      }).catch((err) => {
  
        console.log(err)
        return Promise.reject(err)
      })
  
  
  }


export const getAllIndex = () => dispatch => {
    return axios
      .get('/templetes/index')
      .then((res ) => {
        console.log(res)
        return Promise.resolve(res.data)
      }).catch((err) => {
        console.log(err)
        return Promise.reject(err)
      })
  
  }

  export const getCustomerIndex = (userId) => dispatch => {
    return axios
      .get('/templetes/index/'+userId)
      .then((res ) => {
        console.log(res)
        return Promise.resolve(res.data)
      }).catch((err) => {
        console.log(err)
        return Promise.reject(err)
      })
  
  }
  export const deleteIndex= (indexData) => dispatch => {
  
    return axios
      .delete('/templetes/', { data: indexData })
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
 
