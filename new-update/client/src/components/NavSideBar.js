import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { Collapse, Button,NavbarToggler,Navbar} from 'reactstrap';
import { Icon, InlineIcon } from '@iconify/react';
import bodyIcon from '@iconify/icons-ion/body';
import { logoutPost } from '../services/api';

  
  class NavSideBar extends React.Component {
    state = {
      isOpen: false
  }
  logoutBtnClick = (e) => {
    e.preventDefault()
    logoutPost().then(data => {
        if(data === 10) {
            this.props.history.push('/')
        }
    })
}

  toggle = () => {
    this.setState({
        isOpen: !this.state.isOpen
    })
}
      render() {
        console.log(this.props)
          return (
            // {this.props.user
            //   ?
            //   <React.Fragment>

            //   </React.Fragment>
            //   :
               <React.Fragment>
             
              <div>
             
              <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Dashboard</Button>
              <NavbarToggler onClick={this.toggle}  />
      <Collapse isOpen={this.state.isOpen}>
                 {/* <!-- Main Sidebar Container --> */}
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <Link to="/home" className="brand-link">
      <img src="img/door.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
      <span className="brand-text font-weight-light">Dashboard</span>
    </Link>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="img/manish.jpg" className="img-circle " alt="User Image"/><Icon icon={bodyIcon} />
        </div>
        <div className="info">
          <Link to="#" className="d-block">Admin</Link>
        </div>
      </div>

     
      

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* <!-- Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library --> */}
          <ol className="nav-item menu-open">
            <Link to="/addroom" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>Rooms</p>
            </Link>
              <li className="nav-item">
                <Link to="/resetpassword" className="nav-link active">
                  <p>Setting</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout"onClick={this.logoutBtnClick} className="nav-link active">
                  <p>Logout</p>
                </Link>
              </li>
          </ol>
     
          
        </ul>
      </nav>
      {/* <!-- /.sidebar-menu --> */}
    </div>
    {/* <!-- /.sidebar --> */}
  </aside>
  </Collapse>
  
  
  
  </div>
              
              </React.Fragment>
            
          );
      }
  }
  const mapStateToProps = (state) => {
    return {user: state.user}
}
  export default connect(mapStateToProps)(withRouter(NavSideBar))