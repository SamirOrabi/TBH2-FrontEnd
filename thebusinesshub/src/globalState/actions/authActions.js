import { LOGOUT, SET_CURRENT_USER } from './actionTypes';
import axios from 'axios';
import setAuthToken from '../../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';

export const userRegister = (
  userData,
  userDatalogin,
  history
) => async dispatch => {
  const call = await new Promise((resolve, reject) => {
    axios
      .post('https://cubexs.net/tbhapp/accounts/register', userData)

      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
  let login;

  if (call.code === 0) {
    login = await new Promise((resolve, reject) => {
      axios
        .post('https://cubexs.net/tbhapp/accounts/login', userDatalogin)
        .then(res => {
          resolve(res);

          const userToken = res.data.token;
          localStorage.setItem('userToken', userToken);
          setAuthToken(userToken);
          const decodedToken = jwt_decode(userToken);
          dispatch(setCurrentUser(decodedToken));
          history.push('/UserBoard/Account-Settings');

          axios.defaults.headers.common['authorization'] =
            localStorage.userToken;
          axios
            .post('https://cubexs.net/tbhapp/accounts/verify', {
              Account: {
                id: res.data.id,
                verifyBy: 'sms'
              }
            })
            .then(myres => {})
            .catch(err => console.log(err));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  return call;
};

export const Login = (userdata, history) => async dispatch => {
  const logindata = await new Promise((resolve, reject) => {
    axios
      .post('https://cubexs.net/tbhapp/accounts/login', userdata)
      .then(res => {
        resolve(res.data);
        if (res.data.token) {
          const userToken = res.data.token;
          localStorage.setItem('userToken', userToken);
          setAuthToken(userToken);
          const decodedToken = jwt_decode(userToken);
          dispatch(setCurrentUser(decodedToken));
          history.push('/UserBoard/Account-Settings');
        }
      })
      .catch(err => {
        reject(err);
      });
  });
  return logindata;
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
  history.push('/login');
};
