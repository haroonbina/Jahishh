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
                dispatch({type: 'FETCH_ROOMS_FAILURE', error: 'Error fetching rooms'})
            }
        }).catch(error =>{
            dispatch({type: 'FETCH_ROOMS_FAILURE', error: 'Unable to request data from server'})
        })
    }
}
export const setRoomsAction = (rooms => {
    return (dispatch) => {
        dispatch({type: 'FETCH_ROOMS_SUCCESS', data: rooms});
    }
})
export const socketAction = (socket) => {
    return (dispatch) => {
        dispatch({type: 'CREATE_SOCKET', payload: socket})
    }
}

export const  fetchRoomForUpdateAction = (id) =>{
    return (dispatch) =>{
        fetch(`/rooms/${id}`)
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data =>{
                    dispatch({type: 'ROOM_FOR_EDIT', data});
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
                dispatch({type: 'CREATE_ROOM_SUCCESS'})
            } else {
                dispatch({type: 'CREATE_ROOM_FAILURE', error: 'Error creating room'})
            }
        }).catch(error =>{
            dispatch({type: 'CREATE_ROOM_FAILURE', error: 'Cannot send data to server'})
        })
    }
}

export const  updateRoomAction = (roomObject) =>{
    return (dispatch) =>{
        dispatch({type: 'UPDATE_ROOM_REQUEST'});
        fetch(`/rooms/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomObject)    
        }).then(response => {
            if (response.status === 200) {  
                dispatch({type: 'UPDATE_ROOM_SUCCESS'})
            } else {
                dispatch({type: 'UPDATE_ROOM_FAILURE', error: 'Error updating room'})
            }
        }).catch(error =>{
            dispatch({type: 'CREATE_ROOM_FAILURE', error: 'Cannot send data to server'})
        })
    }
}

export const  deleteRoomAction = (id) =>{
    return (dispatch) =>{
        dispatch({type: 'DELETE_ROOM_REQUEST'});
        fetch(`/rooms/delete/${id}`)
        .then(response => {
            if (response.status === 200) {             
                dispatch({type: 'DELETE_ROOM_SUCCESS', id});
            } else {
                dispatch({type: 'DELETE_ROOM_FAILURE', error: 'Error deleting room'})
            }
        }).catch(error =>{
            dispatch({type: 'DELETE_ROOM_FAILURE', error: 'Unable to send request'})
        })
    }
}