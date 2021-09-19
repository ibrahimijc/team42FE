import axios from 'axios';
import {
  ADD_CURRENCY_LOADING,
  ADD_CURRENCY,
  ADD_CURRENCY_ERROR,
  UPDATE_CURRENCY_LOADING,
  UPDATE_CURRENCY,
  UPDATE_CURRENCY_ERROR,

} from './types';


export const addCurrency = currencyData => dispatch => {

  console.log(currencyData)
  return axios
    .post('/currency', currencyData,
    {
      validateStatus: (status) => {
        return true;  
           },
   })
    .then((res) => {
      console.log(res)
      return Promise.resolve(res.data)
    }).catch((err) => {
      console.log(err)
      if ( err.response && err.response.data != null && err.response.data.meta) {
        console.log(err.response.data.meta.message);
        err = err.response.data.meta.message
      } else {
        err = "Internal Server Error"
      }
      return Promise.reject(err)
    })

}

export const getAllCurrency = () => dispatch => {
  return axios
    .get('/currency')
    .then((res) => {
      console.log(res)

      return Promise.resolve(res.data)
    }).catch((err) => {

      console.log(err)
      return Promise.reject(err)
    })


}


export const getCurrency = (currencyCode) => dispatch => {
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


export const updateCurrency = (addOrderData) => dispatch => {
  return axios
    .put('/currency', addOrderData)
    .then((res) => {
      console.log(res)
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.data != null && err.response.data.validation) {
        console.log(err.response.data);
        err = err.response.data
      } else {
        err = { "msg": "Something went wrong" }
      }
      return Promise.reject(err)

    })
}


export const deleteCurrency = (currencyCode) => dispatch => {
  return axios
    .delete('/currency/'+ currencyCode)
    .then((res) => {
      console.log(res)
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.data != null && err.response.data.meta) {
        console.log(err.response.data.meta.message);
        err = err.response.data.meta.message
      } else {
        err = "Internal Server Error"
      }
      return Promise.reject(err)

    })
}