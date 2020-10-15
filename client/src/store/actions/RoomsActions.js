import roomsReducer from "../reducers/roomReducer";

export const  fetchRoomsAction = () =>{
    return (dispatch) =>{
        dispatch({type: 'FETCH_ROOMS_REQUEST'})
        fetch('/rooms')
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data =>{
                    dispatch({type: 'FETCH_ROOMS_SUCCESS', data});
                })
            } else {
                dispatch({type: 'FETCH_ROOMS_FAILURE', error: 'error fetching rooms'})
            }
        })
    }
}

export const  fetchRoomAction = (id) =>{
    return (dispatch) =>{
        fetch(`/rooms/${id}`)
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data =>{
                    dispatch({type: 'EDIT_ROOM', data});
                })
            } else {
                console.log('you need to contact your admin');
            }
        })
    }
}

export const  createRoomAction = (roomObject) =>{
    return (dispatch) =>{
        dispatch({type: 'CREATE_ROOM_REQUEST'});
        fetch('/rooms/createRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomObject)    
        }).then(response => {
            if (response.status === 200) {  
                response.json()
                .then(data =>{
                    roomObject.id = data.id
                    dispatch({type: 'CREATE_ROOM_SUCCESS', roomObject})
                })
            } else {
                console.log('you need to contact your admin');

            }
        })
    }
}

export const  updateRoomAction = (roomObject) =>{
    return (dispatch) =>{
        fetch(`/rooms/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomObject)    
        }).then(response => {
            if (response.status === 200) {  
                response.json()
                .then(data =>{
                    roomObject.id = data.id
                    dispatch({type: 'CREATE_ROOM', roomObject})
                })
            } else {
                console.log('you need to contact your admin');

            }
        })
    }
}

export const  deleteRoomAction = (id) =>{
    return (dispatch) =>{
        fetch(`/rooms/delete/${id}`, {
            method: 'DELETE'  
        }).then(response => {
            if (response.status === 200) {  
                dispatch({type: 'DELETE_ROOM', id})
            } else {
                console.log('you need to contact your admin');
            }
        })
    }
}
