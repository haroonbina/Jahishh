import { connect } from 'react-redux'
import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { checkuserPost } from '../services/api'


const Login =(props) => {

	const history = useHistory()

	const initialState ={
        admin:'',
        password:''

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
              switch (data) {
                  case 2:
                      setMyState({...myState, entriesError: true, errorElement: <p>There was a server error</p>,errorTitle:'Server error'})
                      break;
                  case 3:
                    setMyState({...myState, entriesError: true, errorElement: <p>Wrong password</p>,errorTitle:"passwod is wrong"})
                    break;
                  case 4:
                    setMyState({...myState, entriesError: true, errorElement: <p>User not Exist</p>,errorTitle:'user not exist'})
                    break; 
                  case 1:
                      //show admin panel
                      props.setUserAction(myState.admin)
                      history.push('/home')
                    console.log('should be login');
                    break;                   
              
                  default:
                      break;
              }

          }).catch(error => {
            setMyState({...myState, entriesError: true, errorElement: <p>cannot send the data</p>,errorTitle:'Unknown error'})
          })
       }
       

    }
        return (
            <React.Fragment>
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
        
            </React.Fragment>
        );
    
}

export default Login;