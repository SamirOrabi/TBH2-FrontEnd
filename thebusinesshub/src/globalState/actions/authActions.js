import axios from 'axios';
import {LOGIN, LOGOUT,SET_CURRENT_USER} from './actionTypes';
import setAuthToken from '../../helpers/setAuthToken';
import jwt_decode from 'jwt-decode'


export const Login =(userdata , history) => dispatch =>{
    console.log(userdata)
axios.post('http://18.185.138.12:5000/api/accounts/login',userdata)
.then(res=>
    {
        console.log(res.data.token);
        console.log(res.data.error);
        const userToken = res.data.token;
        localStorage.setItem('userToken',userToken)
        setAuthToken(userToken);
const decodedToken=jwt_decode(userToken)
        dispatch({type:LOGIN});
        dispatch(setCurrentUser(decodedToken))
        history.push('/')
        console.log(decodedToken)
    }).catch(err=>console.log(err))
}


export const setCurrentUser=decodedToken=>{
    return{
        type:SET_CURRENT_USER,
        payload:decodedToken
    }
}

export const LogOut=history=>dispatch =>{
    localStorage.removeItem('usertoken');
    setAuthToken(false); 
    dispatch(setCurrentUser({}));
    dispatch({type:LOGOUT});
    history.push('/')

}


