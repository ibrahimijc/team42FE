
import axios from 'axios';

export const getAlldata = data => dispatch => {
  if (data.fromYear && data.toYear) {
    return axios
      .get('/data/search/' + data.fromYear + '/' + data.toYear + '/' + data.currentPage + '/' + data.rowsPerPage)
      .then((res) => {
        console.log(res)
        return Promise.resolve(res.data)
      }).catch((err) => {
        console.log(err)
        return Promise.reject(err)
      })
  } else {
    return axios
      .get('/data/' + data.currentPage + '/' + data.rowsPerPage)
      .then((res) => {
        console.log(res)
        return Promise.resolve(res.data)
      }).catch((err) => {
        console.log(err)
        return Promise.reject(err)
      })
  }

}

export const searchAlldata = data => dispatch => {
  return axios
    .get('/data/search/' + data.fromYear + '/' + data.toYear + '/' + data.currentPage + '/' + data.rowsPerPage)
    .then((res) => {
      console.log(res)
      return Promise.resolve(res.data)
    }).catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })

}

export const uploadData = formData => dispatch => {
  return axios
    .post('/data/', formData, {
      headers: { 'Content-Type': 'multipart/form-data', },
      validateStatus: (status) => {
        return true;
      },
    })
    .then(res => {
      console.log(res)
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)

      if (err.response.data != null && err.response.data) {
        console.log(err.response.data);
        err = err.response.data
      } else {
        err = { "msg": "Something went wrong" }
      }

      return Promise.reject(err)
    });
};