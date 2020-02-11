import { LOGIN, LOGOUT, SET_CURRENT_USER } from './actionTypes';
import axios from 'axios';

import setAuthToken from '../../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';

export const userRegister = (
  userData,
  userDatalogin,
  history
) => async dispatch => {
  console.log(userData);

  const call = await new Promise((resolve, reject) => {
    axios
      .post('http://18.185.138.12:5000/api/accounts/register', userData)

      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
  console.log(call);
  let login;
  if (call.code === 0) {
    login = await new Promise((resolve, reject) => {
      axios
        .post('http://18.185.138.12:5000/api/accounts/login', userDatalogin)
        .then(res => {
          resolve(res);
          const userToken = res.data.token;
          localStorage.setItem('userToken', userToken);
          setAuthToken(userToken);
          const decodedToken = jwt_decode(userToken);
          dispatch({ type: LOGIN });
          dispatch(setCurrentUser(decodedToken));
          history.push('/');
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
  console.log(login);

  // console.log(call);
  return call;
};

export const Login = (userdata, history) => dispatch => {
  console.log(userdata);
  axios
    .post('http://18.185.138.12:5000/api/accounts/login', userdata)
    .then(res => {
      const userToken = res.data.token;

      localStorage.setItem('userToken', userToken);

      setAuthToken(userToken);
      const decodedToken = jwt_decode(userToken);
      dispatch({ type: LOGIN });
      dispatch(setCurrentUser(decodedToken));
      history.push('/');
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
  localStorage.removeItem('userToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({ type: LOGOUT });
  history.push('/');
};
