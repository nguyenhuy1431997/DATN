import * as types from './../component/constants/actiontypes';
var inititalState = [];
const user = (state = inititalState, action) => {
    switch (action.type) {
        case types.REGISTER:
            state = action.data;
            // localStorage.setItem('users',JSON.stringify(state));
            return [...state];

        default: return [...state];
    }
}

export default user;