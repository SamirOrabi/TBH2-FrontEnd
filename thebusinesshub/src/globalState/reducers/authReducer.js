import { USER_REG } from '../actions/actionTypes';

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

    default:
      return state;
  }
}
