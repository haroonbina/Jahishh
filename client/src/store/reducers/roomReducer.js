const initState = {
    rooms: {
        loading: false,
        allRooms: [],
        error: ''
    },
    createRoom: {
        fieldsError: [],
        loading: false,
        success: false,   
        error: ''
    },
    editRoom: {},
}

const roomsReducer = (state = initState, action) =>{
    switch(action.type){
        case 'FETCH_ROOMS_REQUEST':
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    loading: true
                }
            }
        case 'FETCH_ROOMS_SUCCESS':
            return {
                ...state,
                rooms: {
                    loading: false,
                    allRooms: action.data,
                    error: ''
                }
            }
        case 'FETCH_ROOMS_FAILURE':
            return {
                ...state,
                rooms: {
                    loading: false,
                    allRoom: [],
                    error: action.error
                }
            }
        case 'FIELDS_ERROR':
            return {
                ...state,
                createRoom: {
                    ...state.createRoom,
                    fieldsError: action.errorArray,
                }
            }
        case 'RESET_ERRORS':
            return {
                ...state,
                createRoom: {
                    ...state.createRoom,
                    fieldsError: [],
                }
            }
        case 'CREATE_ROOM_REQUEST':
            return {
                ...state,
                createRoom: {
                    ...state.createRoom,
                    loading: true
                }
            }
            // return {
            //     ...state,
            //     rooms: [...state.rooms, action.roomObject]
            // }
        case 'CREATE_ROOM_SUCCESS':
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    allRooms: [...state.rooms.allRooms, action.roomObject]
                },
                createRoom: {
                    fieldsError: [],
                    loading: false,
                    success: true,   
                    error: ''
                }
            }
            // return {
            //     ...state,
            //     rooms: [...state.rooms, action.roomObject]
            // }
        // case 'DELETE_ROOM':
        //     return {
        //         ...state,
        //         // we have created new room and comparing with old rooms id if its matching it can deleted otherwise would be staying in the state level.
        //         rooms: state.rooms.filter(room =>{
        //             return room.id != action.id
        //         })
        //     }
        case 'EDIT_ROOM':
            return {
                ...state,
                editRoom: action.data[0],
            }
        default:
            return state;
    }
}

export default roomsReducer;