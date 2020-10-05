import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import NavigationBar from './NavigationBar'
import Home from './Home'
import Page404 from './Page404'
import Footer from './Footer'
import Register from './Register'
import Login from './Login'
import Admin from './Admin'
import AddBook from './AddBook'
import Shop from './Shop'
import Book from './Book'
import MyBooks from './MyBooks'
import MyBook from './MyBook'
import CheckLogin from './CheckLogin'
import {checkLoginPost} from '../services/api'
import {setUserAction} from '../actions'


class Router extends React.Component{
    componentDidMount(){
        checkLoginPost().then(data => {
            if(data != 10) {
                this.props.setUserAction(data)
            }
        })
    }
    render() {
        return(
                <BrowserRouter>
                <div>
                   
                    <NavigationBar />
                    <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/admin" exact component={() => <CheckLogin><Admin /></CheckLogin>} />
                    <Route path="/admin/addbook" exact component={() => <CheckLogin><AddBook /></CheckLogin>} />
                    <Route path="/admin/mybooks" exact component={() => <CheckLogin><MyBooks /></CheckLogin>} />
                    <Route path="/admin/mybook/:id" exact component={() => <CheckLogin><MyBook /></CheckLogin>} />
                    <Route path="/contact" exact component={null} />
                    <Route path="/aboutus" exact component={null} />
                    <Route path="/shop" exact component={Shop} />
                    <Route path="/book/:title/:id" exact component={Book} />
                    <Route path="/" component={Page404} />
                    </Switch>
                    <Footer />
                </div>
                </BrowserRouter>
        )
    }
}

export default connect(null, {setUserAction})(Router)