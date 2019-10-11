import * as types from './../constants/actiontypes';
var inititalState = {
  users: [],
  user: {},
  _token: null,
  error: null
};
const user = (state = inititalState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.GET_USER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        error: null
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        _token: action.data
      }
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        error: null
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        _token: action.data,
        error: null
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        _token: null,
        error: null
      }
    case types.REGISTER_FAIL:
    case types.GET_USER_FAIL:
    case types.LOGIN_FAIL:
      return {
        ...state,
        error: action.data,
        _token: null
      }
    default: return {
      ...state
    };
  }
}

export default user;