import {combineReducers} from 'redux';
import auth_reducer from './auth-reducer';
import Rooms from './rooms';
import shopping from './shopping';

const appReducers=combineReducers({
    auth_reducer,
    Rooms,
    shopping
});

export default appReducers;