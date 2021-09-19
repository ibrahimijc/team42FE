import axios from 'axios';

export const getResult = (templateID) => dispatch => {
    return axios
      .get('/templetes/result/' + templateID)
      .then((res) => {
       
          console.log(res)
        
    
        
        return Promise.resolve(res.data)
      }).catch((err) => {
  
        console.log(err)
        return Promise.reject(err)
      })
  
  
  }
