import React from 'react'
import ReactDOM from 'react-dom'
import Router from './components/Router'




const App = () => {
    return(
        
        <Router />
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))