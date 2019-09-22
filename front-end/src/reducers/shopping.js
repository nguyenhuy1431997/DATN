import * as types from './../component/constants/actiontypes';

var inititalState = [];
const shopping = (state = inititalState, action) => {
    switch (action.type) {
        case types.STATE_SHOPPING:
            state=action.value;
            return [...state];
        default: return [...state];
    }
}

export default shopping;