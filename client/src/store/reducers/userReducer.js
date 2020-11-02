const initState = {
    user: {
        id: null,
        name: '',
        isAuthenticated: false
    },
    loginStatus: {
        loading: false,
        error: ''
    },
    logoutStatus: {
        loading: false,
        error: ''
    },
    changePasswordInputErrors:[],
    changePasswordStatus: {
        loading: false,
        success: false,
        error: ''
    } 
}

const userReducer = (state = initState, action) =>{
    switch(action.type){
        case "ALREADY_LOGEDIN":
            return{
                ...state,
                user: {
                    id: action.data.id,
                    name: action.data.name,
                    isAuthenticated: true
                }
            }
        case "NOT_LOGEDIN":
            return{
                ...state,
                user: {
                    id: null,
                    name: '',
                    isAuthenticated: false
                }
            }
        case "LOGIN_REQUEST":
            return{
                ...state,
                loginStatus: {
                    ...state.loginStatus,
                    loading: true,
                },
            }
        case "LOGIN_SUCCESS":
            return{
                ...state,
                loginStatus: {
                    loading: false,
                    error: ''
                },
                user: {
                    id: action.data.id,
                    name: action.data.name,
                    isAuthenticated: true
                }
            }
        case "LOGIN_FAILURE":
            return{
                ...state,
                loginStatus: {
                    loading: false,
                    error: action.error
                },
            }
        case "RESET_LOGIN_ALERTS":
            return{
                ...state,
                loginStatus: {
                    loading: false,
                    error: ''
                },
            }
        case "LOGOUT_REQUEST":
            return{
                ...state,
                logoutStatus: {
                    loading: true,
                    error: ''
                },
            }
        case "LOGOUT_SUCCESS":
            return{
                ...state,
                logoutStatus: {
                    loading: false,
                    error: ''
                },
                user: {
                    name: '',
                    isAuthenticated: false
                }
            }
        case "LOGOUT_FAILURE":
            return{
                ...state,
                logoutStatus: {
                    loading: false,
                    error: action.error
                },
            }
        case "RESET_LOGOUT_TOAST":
            return{
                ...state,
                logoutStatus: {
                    loading: false,
                    error: ''
                },
            }
        case 'CHANGE_PASSWORD_INPUT_ERRORS':
            return {
                ...state,
                changePasswordInputErrors: action.errorsArray
            }
        case 'RESET_CHANGE_PASSWORD_INPUT_ERRORS':
            return {
                ...state,
                changePasswordInputErrors: []
            }
        case 'CHANGE_PASSWORD_REQUEST':
            return {
                ...state,
                changePasswordStatus: {
                    ...state.changePasswordStatus,
                    loading: true,
                }
            }
        case 'CHANGE_PASSWORD_SUCCESS':
            return {
                ...state,
                changePasswordStatus: {
                    loading: false,
                    success: true,
                    error: ''
                }
            }
        case 'CHANGE_PASSWORD_FAILURE':
            return {
                ...state,
                changePasswordStatus: {
                    loading: false,
                    success: false,
                    error: action.error
                }
            }
        case 'RESET_CHANGE_PASSWORD_ALERTS':
            return {
                ...state,
                changePasswordStatus: {
                    loading: false,
                    success: false,
                    error: '',
                }
            }
    default:
        return state;
    }
}

export default userReducer;