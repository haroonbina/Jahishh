
const initState = {
    rooms: {
        loading: false,
        allRooms: [],
        error: ''
    },
    createRoomInputErrors: [],
    createRoomStatus: {
        loading: false,
        success: false,   
        error: ''
    },
    roomForEdit: {},
    updateRoomInputErrors: [],
    updateRoomStatus: {
        loading: false,
        success: false,   
        error: ''
    },
    deleteRoomStatus: {
        loading: false,
        success: false,   
        error: ''
    },
    socket: null
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
        case 'CREATE_SOCKET':
            return {
                ...state,
                socket: action.payload
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
        case 'CREATE_ROOM_INPUT_ERRORS':
            return {
                ...state,
                createRoomInputErrors: action.errorsArray
            }
        case 'RESET_CREATE_ROOM_INPUT_ERRORS':
            return {
                ...state,
                createRoomInputErrors: []
            }
        case 'CREATE_ROOM_REQUEST':
            return {
                ...state,
                createRoomStatus: {
                    ...state.createRoomStatus,
                    loading: true
                }
            }
        case 'CREATE_ROOM_SUCCESS':
            return {
                ...state,
                createRoomStatus: {
                    loading: false,
                    success: true,   
                    error: ''
                }
            }
        case 'CREATE_ROOM_FAILURE':
            return {
                ...state,
                createRoomStatus: {
                    loading: false,
                    success: false, 
                    error: action.error
                }
            }
        case 'RESET_CREATE_ROOM_ALERTS':
            return {
                ...state,
                createRoomStatus: {
                    loading: false,
                    success: false,   
                    error: ''
                }
            }
        case 'ROOM_FOR_EDIT':
            return {
                ...state,
                roomForEdit: action.data[0],
            }
        case 'UPDATE_ROOM_INPUT_ERRORS':
            return {
                ...state,
                updateRoomInputErrors: action.errorsArray
            }
        case 'RESET_UPDATE_ROOM_INPUT_ERRORS':
            return {
                ...state,
                updateRoomInputErrors: []
            }
        case 'UPDATE_ROOM_REQUEST':
            return {
                ...state,
                updateRoomStatus: {
                    ...state.updateRoomStatus,
                    loading: true
                }
            }
        case 'UPDATE_ROOM_SUCCESS':
            return {
                ...state,
                updateRoomStatus: {
                    loading: false,
                    success: true,   
                    error: ''
                }
            }
        case 'UPDATE_ROOM_FAILURE':
            return {
                ...state,
                updateRoomStatus: {
                    loading: false,
                    success: false, 
                    error: action.error
                }
            }
        case 'RESET_UPDATE_ROOM_ALERTS':
            return {
                ...state,
                updateRoomStatus: {
                    loading: false,
                    success: false, 
                    error: ''
                }
            }
        case 'DELETE_ROOM_REQUEST':
            return {
                ...state,
                deleteRoomStatus: {
                    loading: true,
                }
            }
        case 'DELETE_ROOM_SUCCESS':
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    allRooms: state.rooms.allRooms.filter(room => room.id !== parseInt(action.id))
                },
                deleteRoomStatus: {
                    loading: false,
                    success: true,   
                    error: ''
                }
            }
        case 'DELETE_ROOM_FAILURE':
            return {
                ...state,
                deleteRoomStatus: {
                    loading: false,
                    success: false,   
                    error: action.error
                }
            }
        case 'RESET_DELETE_ROOM_TOAST':
            return {
                ...state,
                deleteRoomStatus: {
                    loading: false,
                    success: false,   
                    error: ''
                }
            }
        default:
            return state;
    }
}

export default roomsReducer;