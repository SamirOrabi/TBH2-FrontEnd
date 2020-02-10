import {
  USER_REG,
  GET_ERRORS,
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER
} from './actionTypes';
import axios from 'axios';

import setAuthToken from '../../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';

export const userRegister = (userData, history, myres) => async dispatch => {
  console.log(userData);
  const call = await new Promise((resolve, reject) => {
    axios
      .post('http://18.185.138.12:5000/api/accounts/register', userData)

      .then(res => {
        // console.log(res.data);
        // console.log(res.data.error);
        // dispatch({ type: USER_REG });
        // myres = res.data;
        // // console.log(myerror)
        // if (res.data.code === 0) {
        //   // history.push('/home');
        // } else {
        //   console.log('feh haga 8lt');
        // }
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
        dispatch({
          type: GET_ERRORS,
          payload: err.res.data
        });
      });
  });
  // console.log(call);
  return call;
};

export const Login = (userdata, history) => dispatch => {
  console.log(userdata);
  axios
    .post('http://18.185.138.12:5000/api/accounts/login', userdata)
    .then(res => {
      console.log(res.data.token);
      console.log(res.data.error);
      const userToken = res.data.token;
      localStorage.setItem('userToken', userToken);
      setAuthToken(userToken);
      const decodedToken = jwt_decode(userToken);
      dispatch({ type: LOGIN });
      dispatch(setCurrentUser(decodedToken));
      history.push('/');
      console.log(decodedToken);
    })
    .catch(err => console.log(err));
};

export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

export const LogOut = history => dispatch => {
  localStorage.removeItem('usertoken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({ type: LOGOUT });
  history.push('/');
};
