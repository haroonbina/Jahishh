import React from 'react';
import {Link, useHistory} from 'react-router-dom'

  
  class SettingRoom extends React.Component {
      constructor(props) {
          super(props);
          this.state = {  };
      }
      render() {
          return (
              <React.Fragment>
              {/* <!-- Content Wrapper. Contains page content --> */}
  <div className="content-wrapper">
    {/* <!-- Content Header (Page header) --> */}
    
        
         
            <ol className="breadcrumb ">
            <Link className="breadcrumb-item" to="/home">Dashboard</Link>
              <li className="breadcrumb-item active">Add Room</li>
            </ol>
          
        
      
    
   
  </div>
           
              </React.Fragment>
          );
      }
  }
  
  export default SettingRoom;