import {combineReducers} from 'redux';
import auth_reducer from './auth-reducer';
import Products from './product';
import shopping from './shopping';

const appReducers=combineReducers({
    auth_reducer,
    Products,
    shopping
});

export default appReducers;