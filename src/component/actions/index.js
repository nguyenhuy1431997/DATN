import * as types from './../constants/actiontypes';
import axios from 'axios';

export const registeruserAPI=(name,pass)=>{
    var randomstring = require("randomstring");
    var token =randomstring.generate();
    return(dispatch)=>{
        return axios({
            method: 'POST',
            url: ' http://localhost:3000/auth',
            data: {
                name:name,
                token:token,
                pass:pass
            },
        }).then(res => {
            dispatch(authAPI());
        }).catch(err => {
            console.log(err);
        });
    }
}

export const authAPI=()=>{
    return(dispatch)=>{
        return axios({
            method: 'GET',
            url: ' http://localhost:3000/auth',
            data: null,
        }).then(res => {
            dispatch(registeruser(res.data));
        }).catch(err=>{
            console.log(err);
        });
        
    }
}

export const registeruser=(data)=>{
    return{
        type: types.REGISTER,
        data
    }
}

export const stateproductsAPI=()=>{
    return(dispatch)=>{
        return axios({
            method: 'GET',
            url: ' http://localhost:3000/product',
            data: null,
        }).then(res => {
            dispatch(stateproducts(res.data));
        }).catch(err=>{
            console.log(err);
        });
        
    }
}

export const stateproducts=(value)=>{
    return{
        type: types.STATE_PRODUCT,
        value
    }
}

export const stateShoppingAPI=()=>{
    return(dispatch)=>{
        return axios({
            method: 'GET',
            url: ' http://localhost:3000/shoppings',
            data: null,
        }).then(res => {
            dispatch(stateShopping(res.data));
        }).catch(err=>{
            console.log(err);
        });
    }
}

export const stateShopping=(value)=>{
    return{
        type: types.STATE_SHOPPING,
        value
    }
}

export const onShoppingAPI=(name,_id,price,accout)=>{
    
    return(dispatch)=>{
        return axios({
            method: 'POST',
            url: ' http://localhost:3000/shoppings',
            data: {
                _id:_id,
                name:name,
                sl:1,
                price:price,
                accout:accout
            },
        }).then(res => {
            dispatch(stateShoppingAPI());
        }).catch(err => {
            console.log(err);
        });
    }
}

export const upShoppingAPI=(id,name,_id,sl,price,accout)=>{
    
    return(dispatch)=>{
        return axios({
            method: 'PUT',
            url: `http://localhost:3000/shoppings/${id}`,
            data: {
                id:id,
                _id:_id,
                name:name,
                sl:sl,
                price:price,
                accout:accout
            },
        }).then(res => {
            dispatch(stateShoppingAPI());
        }).catch(err => {
            console.log(err);
        });
    }
}

export const downShoppingAPI=(id,name,_id,sl,price,accout)=>{
    return(dispatch)=>{
        return axios({
            method: 'PUT',
            url: `http://localhost:3000/shoppings/${id}`,
            data: {
                id:id,
                _id:_id,
                name:name,
                sl:sl,
                price:price,
                accout:accout
            },
        }).then(res => {
            dispatch(stateShoppingAPI());
        }).catch(err => {
            console.log(err);
        });
    }
}

export const onEraseShoppingAPI=(id)=>{
    return(dispatch)=>{
        return axios({
            method: 'DELETE',
            url: `http://localhost:3000/shoppings/${id}`,
            data: null
        }).then(res => {
            dispatch(stateShoppingAPI());
        }).catch(err => {
            console.log(err);
        });
    }
}

