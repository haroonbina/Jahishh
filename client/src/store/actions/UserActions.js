export const LoginAction = (credentials) =>{
    return (dispatch) =>{
        dispatch({type: 'LOGIN_REQUEST'});
        fetch('/admins/login', {
			method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
		})
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data =>{
                    dispatch({type: 'LOGIN_SUCCESS', data});
                })
            } else {
                dispatch({type: 'LOGIN_FAILURE', error: 'Failed to login'});
            }
        })
    }
}

export const LogoutAction = () =>{
    return (dispatch) =>{
        dispatch({type: 'LOGOUT_REQUEST'});
        fetch('/admins/logout', {
			method: 'POST',
		})
        .then(response => {
            if (response.status === 200) {
                dispatch({type: 'LOGOUT_SUCCESS'});
            } else {
                dispatch({type: 'LOGOUT_FAILURE', error: 'Unable to logout'});
            }
        })
    }
}

export const CheckLoginAction = () =>{
    return (dispatch) =>{
        fetch('/admins/checkLogin', {
            method: 'POST',
            credentials: "include",
		})
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data =>{
                    dispatch({type: 'ALREADY_LOGEDIN', data});
                })
            } else {
                dispatch({type: 'NOT_LOGEDIN'});
            }
        })
    }
}

export const changePasswordAction = (dataObject) =>{
    return (dispatch) =>{
        dispatch({type: 'CHANGE_PASSWORD_REQUEST'});
        fetch('/admins/changePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
		})
        .then(response => {
            if (response.status === 200) {              
                dispatch({type: 'CHANGE_PASSWORD_SUCCESS'});
            } else {
                dispatch({type: 'CHANGE_PASSWORD_FAILURE', error: 'Failed to change password'});
            }
        }).catch(err =>{
            dispatch({type: 'CHANGE_PASSWORD_FAILURE', error: 'Failed to change password'});
        })
    }
}