import { USER_REG, GET_ERRORS } from './actionTypes';
import axios from 'axios';

export const userRegister = (userData, history, myres) => dispatch => {
  console.log(userData);
  axios
    .post('http://18.185.138.12:5000/api/accounts/register', userData)

    .then(res => {
      console.log(res.data);
      console.log(res.data.error);
      dispatch({ type: USER_REG });
      myres = res.data;
      // console.log(myerror)
      if (res.data.code === 0) {
        // history.push('/home');
      } else {
        console.log('feh haga 8lt');
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    );
};
