import * as types from './../constants/actiontypes';
var inititalState = {
    rooms: [],
};

const Rooms = (state = inititalState, action) => {
    switch (action.type) {
        case types.GET_ROOMS_REQUEST:
        case types.ERASE_ROOM_REQUEST:
            return {
                ...state
            }
        case types.GET_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.data.rooms
            }
        case types.GET_ROOMS_FAIL:
        case types.ALL_ROOM_FAIL:
            return {
                ...state
            }
        default: return {
            ...state
        };
    }
}

export default Rooms;