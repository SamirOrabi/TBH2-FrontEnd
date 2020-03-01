// import {
//   GET_PROFILE,
//   CLEAR_CURRENT_PROFILE,
//   PROFILE_LOADING
// } from './actionTypes';
// import axios from 'axios';

// export const getProfile = userid => async dispatch => {
//     dispatch(setProfileLoading())
//   const userProfile = await new Promise((resolve, reject) => {
//     axios
//       .post('https://cubexs.net/tbhapp/accounts/getprofile', userid)
//       .then(res => {
//         dispatch({
//           type: GET_PROFILE,
//           payload: res.data
//         });
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
//   return userProfile;
// };

// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_PROFILE
//   };
// };

// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };
