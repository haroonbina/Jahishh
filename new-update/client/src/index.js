import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Router from './components/Router'
import reducers from './reducers'





const App = () => {
    return(
        
        <Router />
    )
}

ReactDOM.render(<Provider store={createStore(reducers)} ><App /></Provider>, document.querySelector('#root'))