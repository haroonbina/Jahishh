import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import Router from './components/Router'
import rootReducer from './store/reducers/rootReducer'
import './css/index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));


const App = () => {
    return( 
        <Router />
    )
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'))