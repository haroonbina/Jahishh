import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap'


  import {logoutPost} from '../services/api'

class NavigationBar extends React.Component {
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    logoutBtnClick = (e) => {
        e.preventDefault()
        logoutPost().then(data => {
            if(data === 10) {
                this.props.history.push('/login')
            }
        })
    }
  render() {
      let currentLocation = this.props.location.pathname
    return (
      <header>
          <div className="main-menu">
            <div className="container">
            <Navbar color="light" light expand="lg">
                <NavbarBrand tag={Link} to="/">
                    <img src="/images/logo.png" alt="logo" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="navbar-item" active={currentLocation === '/' ? true : false}>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem className="navbar-item" active={currentLocation === '/shop' ? true : false} >
                            <NavLink tag={Link} to="/shop">Shop</NavLink>
                        </NavItem>
                        <NavItem className="navbar-item" active={currentLocation === '/about' ? true : false}>
                            <NavLink tag={Link} to="/about">About</NavLink>
                        </NavItem>
                        <NavItem className="navbar-item" active={currentLocation === '/faq' ? true : false}>
                            <NavLink tag={Link} to="/faq">FAQ</NavLink>
                        </NavItem>
                        {this.props.user
                        ?
                        <React.Fragment>
                            <NavItem className="navbar-item" >
                                <NavLink  href="#" onClick={this.logoutBtnClick}>Logout</NavLink>
                            </NavItem>
                            <NavItem className="navbar-item" active={currentLocation === '/admin' ? true : false}>
                                <NavLink tag={Link} to="/admin">Dashboard</NavLink>
                            </NavItem>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <NavItem className="navbar-item" active={currentLocation === '/login' ? true : false}>
                                <NavLink tag={Link} to="/login">Login</NavLink>
                            </NavItem>
                            <NavItem className="navbar-item" active={currentLocation === '/register' ? true : false}>
                                <NavLink tag={Link} to="/register">Register</NavLink>
                            </NavItem>
                        </React.Fragment>
                        }

                        
                    </Nav>
                    <div className="cart my-2 my-lg-0">
                            <span>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                            <span className="quntity">3</span>
                    </div>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search here..." aria-label="Search" />
                            <span className="fa fa-search"></span>
                        </form>
                </Collapse>
            </Navbar>
            </div>
        </div>
      </header>
    )
  }
}
const mapStateToProps = (state) => {
    return ({user: state.user})
}

export default connect(mapStateToProps)(withRouter(NavigationBar))