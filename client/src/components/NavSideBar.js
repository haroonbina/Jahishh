import React from 'react';
import {Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

  
  class NavSideBar extends React.Component {
      constructor(props) {
          super(props);
          this.state = {  };
      }
      render() {
          return (
              <React.Fragment>
                 {/* <!-- Main Sidebar Container --> */}
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <Link to="/dashboard" className="brand-link">
      <img src="/img/door.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
      <span className="brand-text font-weight-light">Dashboard</span>
    </Link>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="/img/manish.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">Admin</a>
        </div>
      </div>

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* <!-- Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library --> */}
          <li className="nav-item menu-open">
            <Link to="/addRoom" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Add Room
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/home" className="nav-link active">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Log Out</p>
                </Link>
              </li>
             
        
            </ul>
          </li>
         
         
            
             
             
           
          
          
           
          
             
            </ul>
      
          
       
        
      </nav>
      {/* <!-- /.sidebar-menu --> */}
    </div>
    {/* <!-- /.sidebar --> */}
  </aside>
              </React.Fragment>
          );
      }
  }
  
  export default NavSideBar;