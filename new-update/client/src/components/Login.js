import { connect } from 'react-redux'
import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { checkuserPost } from '../services/api'
import PopUpModal from './PopUpModal'
import {setUserAction} from '../actions'


const Login =(props) => {

	const history = useHistory()

	const initialState ={
        admin:'',
        password:'',
        entriesError: false,
        errorElement: null,
        errorTitle: ''

    }
	const [myState, setMyState] = useState(initialState);
    const onloginBtnclick = (e)=> {
        e.preventDefault()
       if (myState.admin === '' || myState.password === '') {
           const errorElement = (
               <ul>
                   {myState.admin.trim() === '' ? <li>admin should not be empty</li> : null}
                   {myState.password === '' ? <li>Password should not be empty</li> : null}
               </ul>
           )
           setMyState({...myState,entriesError:true,errorElement,errorTitle:'Entries Error'})
       } else {
		checkuserPost(myState.admin, myState.password).then(data => {
            console.log(data);
              switch (data) { 
                  case 1:
                      props.setUserAction(myState.admin)
                      history.push('/home')
                    console.log('should be login');
                    break; 
                  case 2:
                      setMyState({...myState, entriesError: true, errorElement: <p>Missing Entries either You miss username or password !</p>,errorTitle:'Server error'})
                      break;
                  case 3:
                    setMyState({...myState, entriesError: true, errorElement: <p>Eithe username or password is Wrong !</p>,errorTitle:"passwod is wrong"})
                    break;
                  case 4:
                    setMyState({...myState, entriesError: true, errorElement: <p>Server Error</p>,errorTitle:'user not exist'})
                    break; 
                                   
              
                  default:
                      break;
              }

          }).catch(error => {
              console.log(error);
            setMyState({...myState, entriesError: true, errorElement: <p>cannot send the data</p>,errorTitle:'Unknown error'})
          })
       }
       
       

    }
    const closeModal = () => {
        setMyState({
          ...myState,
          entriesError: false
        })
      }
        return (
            <React.Fragment>
            <div className="content-wrapper">
            <PopUpModal show={myState.entriesError}close={closeModal}
            
        className="bg-danger"
        title={myState.errorTitle}>{myState.errorElement}</PopUpModal>
			<div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-title p-b-43">
						Login to continue
					</span>
					
					
					<div className="wrap-input100 validate-input" >
						<input className="input100"placeholder="Admin" type="text" onChange={(e) => {setMyState({...myState, admin: e.target.value})}}  value={myState.admin} />
						
						
					</div>
					
					
					<div className="wrap-input100 validate-input" >
						<input className="input100" type="password" name="password" placeholder="Password" onChange={(e) => {setMyState({...myState, password: e.target.value})}}  required value={myState.password}/>
						
					</div>
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={onloginBtnclick}>
							Login
						</button>
					</div>
				</form>

				<div className="login100-more" style={{backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")"}}>
				</div>
			</div>
		</div>
	</div>
  </div>
            </React.Fragment>
        );
    
}

export default connect(null, {setUserAction})(Login);