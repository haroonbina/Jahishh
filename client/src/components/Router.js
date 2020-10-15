import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavSideBar from './NavSideBar';
import Dashboard from './Dashboard';
import AddRoom from './AddRoom';
import EditRoom from './editRoom'
import Footer from './Footer';
import Login from './Login';

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div> 
                    <NavSideBar />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/addRoom" component={AddRoom} />
                        <Route path="/editRoom/:room_id" component={EditRoom} />
                    </Switch>
                    <Footer />      
                </div>
            </BrowserRouter>
        );
    }
}

export default Router