import axios from 'axios';

export const getAllTemplates = () => dispatch => {
  return axios
    .get('/templetes/?Type=TEMPLATE')
    .then((res) => {
      console.log(res)
      return Promise.resolve(res.data)
    }).catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })

}
export const deleteTemplate = (templateData) => dispatch => {

  return axios
    .delete('/templetes/', { data: templateData })
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
export const getAllIndex = () => dispatch => {
  return axios
    .get('/templetes/user/index')
    .then((res) => {
      console.log(res)
      return Promise.resolve(res.data)
    }).catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })

}


export const addTemplate = data => dispatch => {

  // Restaurant Updae
  return axios
    .post('/templetes/', data, {
      validateStatus: (status) => {
        return true;
      },
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)
      if (err.response.data != null && err.response.data.validation) {
        console.log(err.response.data);
        err = err.response.data
      } else {
        err = { "msg": "Something went wrong" }
      }
      return Promise.reject(err)
    });
}

export const updateTemplate = itemData => dispatch => {

  // Restaurant Updae
  return axios
    .put('/templetes/', itemData, {
      validateStatus: (status) => {
        return true;
      },
    })
    .then(res => {
      
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)
      if (err.response.data != null && err.response.data.validation) {
        console.log(err.response.data);
        err = err.response.data
      } else {
        err = { "msg": "Something went wrong" }
      }

      return Promise.reject(err)
    });
}

export const searchMatric = (MatricName) => dispatch => {

  return axios
    .get('/data/matric/search/' + MatricName)
    .then((res) => {
      console.log(res.data.content)

      return Promise.resolve(res.data)
    }).catch((err) => {
      console.log(err)

      return Promise.reject(err)
    })
}