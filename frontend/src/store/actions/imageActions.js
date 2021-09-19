import axios from 'axios';

export const uploadImage = imageData => dispatch => {
    return axios
        .post('/templetes/images', imageData, {
            headers: { 'Content-Type': 'multipart/form-data', },
            validateStatus: (status) => {
                return true;
            },
        }).then(res =>{ 
            console.log(res)
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

};