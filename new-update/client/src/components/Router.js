import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Footer from './Footer';
import Login from './Login';

import NavSideBar from './NavSideBar';
import Home from './Home';
import Room from './Room';
import SettingRoom from './SettingRoom';
import Page404 from './Page404';

import AddRoom from './AddRoom';
import PassWordReset from './PasswordReset';

class Router extends React.Component {
    state = {  }
    render() {
        return (
            <BrowserRouter>
            
            
            <NavSideBar></NavSideBar>
           <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Route path="/room" exact component={Room} />
                <Route path="/addroom" exact component={AddRoom} />
                <Route path="/Setting" exact component={SettingRoom} />
                <Route path="/resetpassword" exact component={PassWordReset} />
                <Route path="/" component={Page404} />
           </Switch>
           <Footer></Footer>
          
            </BrowserRouter>
        );
    }
}

export default Router