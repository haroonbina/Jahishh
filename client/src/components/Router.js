import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckLoginAction } from '../store/actions/UserActions';
import Home from './HomePageComponents/Hoom';
import Documentation from './HomePageComponents/Documentation';
import Login from './AuthComponents/Login';
import Dashboard from './DashboardComponents/Dashboard';
import AddRoom from './DashboardComponents/AddRoom';
import EditRoom from './DashboardComponents/EditRoom';
import Settings from './DashboardComponents/Settings';


class Router extends Component {

    componentDidMount(){
        this.props.checkLogin();
    }

    render() {
        return (
            <BrowserRouter>
                <div> 
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/documentation" component={Documentation} />
                        <Route path="/login" component={Login} /> 
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/addRoom" component={AddRoom} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/editRoom/:room_id" component={EditRoom} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
	return {
		checkLogin: () =>{dispatch(CheckLoginAction())},
	}
}

export default connect(null, mapDispatchToProps)(Router);