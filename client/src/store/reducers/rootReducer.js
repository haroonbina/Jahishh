import { combineReducers } from 'redux';
import userReducer from './userReducer';
import roomsReducer from './roomReducer';

const rootReducer = combineReducers({
    userData: userReducer,
    roomsData: roomsReducer
})

export default rootReducer;