import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Footer from './Footer';
import Login2 from './Login2';
import Login from './Login';
import NavBar from './NavBar';
import NavSideBar from './NavSideBar';
import Index1 from './Index1';

class Router extends React.Component {
    state = {  }
    render() {
        return (
            <BrowserRouter>
             <div> 
            <NavBar></NavBar>
            <NavSideBar></NavSideBar>
           <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Index1} />
           </Switch>
           <Footer></Footer>
            
            
            </div>
            </BrowserRouter>
        );
    }
}

export default Router