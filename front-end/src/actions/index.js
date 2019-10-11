import * as types from './../constants/actiontypes';
import axios from 'axios';

export const registeruserAPI = (name, pass) => {
  return async (dispatch) => {
    dispatch(() => {
      return {
        type: types.REGISTER_REQUEST,
      }
    })
    const res = await axios.post('http://localhost:3010/api/v1/auth/register', {
      username: name,
      password: pass
    });
    if (res.data.success) {
      dispatch(registerSuccess(res.data.result.token))
    } else {
      dispatch(registerFail(res.data.error));
    }
  }
}

export const registerSuccess = (data) => {
  return {
    type: types.REGISTER_SUCCESS,
    data
  }
}

export const registerFail = (data) => {
  return {
    type: types.REGISTER_FAIL,
    data
  }
}

export const getUser = (token) => {
  return (dispatch) => {
    dispatch(() => {
      return {
        type: types.GET_USER_REQUEST,
      }
    })
    return axios.get('http://localhost:3010/api/v1/users/me', {
      headers: {
        Authorization: token
      }
    }
    )
      .then(res => {
        if (res.data.success) {
          dispatch(getUserSuccess(res.data))
        } else {
          dispatch(getUserFail(res.data.error));
        }
      })
      .catch(err => console.log(err))
  }
}

export const getUserSuccess = (data) => {
  return {
    type: types.GET_USER_SUCCESS,
    data
  }
}

export const getUserFail = (data) => {
  return {
    type: types.GET_USER_FAIL,
    data
  }
}

export const loginAPI = (name, pass) => {
  return async (dispatch) => {
    dispatch(() => {
      return {
        type: types.LOGIN_REQUEST,
      }
    })
    const res = await axios.post('http://localhost:3010/api/v1/auth/login', {
      username: name,
      password: pass
    });
    if (res.data.success) {
      dispatch(loginSuccess(res.data.result.token));
      await dispatch(getUser(res.data.result.token));
    } else {
      dispatch(loginFail(res.data.error));
    }
  }
}

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    data
  }
}

export const loginFail = (data) => {
  return {
    type: types.LOGIN_FAIL,
    data
  }
}

export const logOut = (value,username,password) => {
  return async (dispatch) => {
    dispatch(() => {
      return {
        type: types.LOGIN_REQUEST,
      }
    })
    const res = await axios.post('http://localhost:3010/api/v1/auth/logout', 
    {
      username: username,
      password: password,
    },
    {
      headers: {
        Authorization: value
      }
    },
    );
    if (res) {
      console.log(res);
      dispatch(logOutSuccess());
      // await dispatch(getUser(res.data.result.token));
    } else {
      // dispatch(loginFail(res.data.error));
    }
  }
}

export const logOutSuccess = (data) => {
  return {
    type: types.LOGOUT_SUCCESS,
    data
  }
}

export const logOutFail = (data) => {
  return {
    type: types.LOGIN_FAIL,
    data
  }
}

export const allRoom = (ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, _token) => {
  console.log('all')
  return async (dispatch) => {
    dispatch(() => {
      return {
        type: types.ALL_ROOM_REQUEST,
      }
    })
    const res = await axios.post('http://localhost:3010/api/v1/rooms',
      {
        name: ten,
        address: diachi,
        districtId: khuvuc,
        roomTypeId: loai,
        priority: namnu,
        description: noidung,
        area: dientich,
        price: gia
      },
      {
        headers: {
          Authorization: _token
        }
      },

    );
    if (res) {
      dispatch(getRooms());
      // await dispatch(getUser(res.data.result.token));
    } else {
      dispatch(allRoomFail(res.data));
    }
  }
}

export const allRoomFail = (data) => {
  return {
    type: types.ALL_ROOM_FAIL,
    data
  }
}

export const getRooms = () => {
  return async (dispatch) => {
    dispatch(() => {
      return {
        type: types.GET_USER_REQUEST,
      }
    })
    const res = await axios.get('http://localhost:3010/api/v1/rooms/filter/1/1000');
    if (res) {
      dispatch(getRoomsSuccess(res.data.result));
      // await dispatch(getUser(res.data.result.token));
    } else {
      dispatch(getRoomsFail(res.data.error));
    }
  }
}

export const getRoomsSuccess = (data) => {
  return {
    type: types.GET_ROOMS_SUCCESS,
    data
  }
}

export const getRoomsFail = (data) => {
  return {
    type: types.GET_ROOMS_FAIL,
    data
  }
}

export const updateRoom = (id, ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, rooms, _token) => {
  console.log('all')
  console.log(id, ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, rooms, _token);

  return async (dispatch) => {
    dispatch(() => {
      return {
        type: types.ALL_ROOM_REQUEST,
      }
    })
    const res = await axios.put(`http://localhost:3010/api/v1/rooms/${id}`,
      {
        name: ten,
        address: diachi,
        districtId: khuvuc,
        roomTypeId: loai,
        priority: namnu,
        description: noidung,
        area: dientich,
        price: gia
      },
      {
        headers: {
          Authorization: _token
        }
      },

    );
    if (res) {
      console.log(res)
      dispatch(getRooms());
      // await dispatch(getUser(res.data.result.token));
    } else {
      // dispatch(allRoomFail(res.data));
    }
  }
}

export const eraseRoom = (id, _token) => {
  return async (dispatch) => {
    dispatch(() => {
      return {
        type: types.ERASE_ROOM_REQUEST,
      }
    })
    const res = await axios.post(`http://localhost:3010/api/v1/rooms/${id}/delete`, null,
      {
        headers: {
          Authorization: _token
        }
      }
    );
    if (res) {
      dispatch(getRooms());
      // await dispatch(getUser(res.data.result.token));
    } else {
      // dispatch(allRoomFail(res.data));
    }
  }
}
// export const authAPI=()=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'GET',
//             url: ' http://localhost:3000/auth',
//             data: null,
//         }).then(res => {
//             dispatch(registeruser(res.data));
//         }).catch(err=>{
//             dispatch()
//         });

//     }
// }

//
// export const getOptiondistrics=()=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'GET',
//             url: ' http://localhost:3010/districs',
//             data: null,
//         }).then(res => {
//             dispatch(statedistricsAPI(res.data));
//         }).catch(err=>{
//             console.log(err);
//         });
//
//     }
// }
//
// export const statedistricsAPI=(data)=>{
//     return{
//         type: types.REGISTER,
//         data
//     }
// }
// export const alltroAPI=(ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file)=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'POST',
//             url: ' http://localhost:3010/rooms',
//             data: {
                // name: ten,
                // address: diachi,
                // districtId:khuvuc,
                // roomTypeId: loai,
                // priority: namnu,
                // description: noidung,
                // area: dientich,
                // price: gia
//             },
//         }).then(res => {
//             dispatch(stateproductsAPI());
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }

// export const stateproductsAPI=()=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'GET',
//             url: ' http://localhost:3000/product',
//             data: null,
//         }).then(res => {
//             dispatch(stateproducts(res.data));
//         }).catch(err=>{
//             console.log(err);
//         });

//     }
// }

// export const stateproducts=(value)=>{
//     return{
//         type: types.STATE_PRODUCT,
//         value
//     }
// }

// export const stateShoppingAPI=()=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'GET',
//             url: ' http://localhost:3000/shoppings',
//             data: null,
//         }).then(res => {
//             dispatch(stateShopping(res.data));
//         }).catch(err=>{
//             console.log(err);
//         });
//     }
// }

// export const stateShopping=(value)=>{
//     return{
//         type: types.STATE_SHOPPING,
//         value
//     }
// }

// export const onShoppingAPI=(name,_id,price,accout)=>{

//     return(dispatch)=>{
//         return axios({
//             method: 'POST',
//             url: ' http://localhost:3000/shoppings',
//             data: {
//                 _id:_id,
//                 name:name,
//                 sl:1,
//                 price:price,
//                 accout:accout
//             },
//         }).then(res => {
//             dispatch(stateShoppingAPI());
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }

// export const upShoppingAPI=(id,name,_id,sl,price,accout)=>{

//     return(dispatch)=>{
//         return axios({
//             method: 'PUT',
//             url: `http://localhost:3000/shoppings/${id}`,
//             data: {
//                 id:id,
//                 _id:_id,
//                 name:name,
//                 sl:sl,
//                 price:price,
//                 accout:accout
//             },
//         }).then(res => {
//             dispatch(stateShoppingAPI());
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }

// export const downShoppingAPI=(id,name,_id,sl,price,accout)=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'PUT',
//             url: `http://localhost:3000/shoppings/${id}`,
//             data: {
//                 id:id,
//                 _id:_id,
//                 name:name,
//                 sl:sl,
//                 price:price,
//                 accout:accout
//             },
//         }).then(res => {
//             dispatch(stateShoppingAPI());
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }

// export const onEraseShoppingAPI=(id)=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'DELETE',
//             url: `http://localhost:3000/shoppings/${id}`,
//             data: null
//         }).then(res => {
//             dispatch(stateShoppingAPI());
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }

// export const onEraseTroAPI=(id)=>{
//     return(dispatch)=>{
//         return axios({
//             method: 'DELETE',
//             url: `http://localhost:3000/product/${id}`,
//             data: null
//         }).then(res => {
//             dispatch(stateproductsAPI());
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }

