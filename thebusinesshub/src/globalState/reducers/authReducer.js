import { USER_REG } from '../actions/actionTypes';
import { LOGIN, LOGOUT, SET_CURRENT_USER } from '../actions/actionTypes';
import isEmpty from '../../helpers/is-Empty';
const initialState = {
  isAuth: false,
  user: {},
  code: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_REG:
      return {
        ...state,
        isAuth: true,
        user: action.payload
      };

    case LOGIN:
      return { ...state, isAuth: true };

    case LOGOUT:
      return { ...state, isAuth: false };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
