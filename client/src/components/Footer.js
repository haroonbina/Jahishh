import React from 'react';


  
  class Footer extends React.Component {
      constructor(props) {
          super(props);
          this.state = {  };
      }
      render() {
          return (
              <React.Fragment>
                  <footer className="main-footer">
    <strong>Copyright &copy; 2014-2020 <a href="https://github.com/Alen-Eftimov">Alen</a>, Chumky, Haroon, <a href="https://github.com/manishwild">Manish</a>.</strong>
    All rights reserved.
    <div className="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.1.0-pre
    </div>
  </footer>
              </React.Fragment>
          );
      }
  }
  
  export default Footer;