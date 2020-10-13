import React, {useState, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { changePasswordPost } from '../services/api';
import PopUpModal from './PopUpModal';

const PassWordReset = () => {
    const history = useHistory()

  const initialState = {
    oldPassword: '',
    newPassword: '',
    reNewPassword:'',
    modalElement: null,
    showModal: false,
    modalTitle: '',
    modalClass: 'bg-danger'
  }
  const [myState, setMyState] = useState(initialState);




  const passwordSaveBtnClick = e => {
    e.preventDefault()
    if (myState.oldPassword ==='' || 
    myState.newPassword === '' ||
    myState.newPassword !== myState.reNewPassword ){
          const errorElement = (
            <ul>
              {myState.oldPassword ==='' ? <li>please enter correct password</li> : null}
              {myState.newPassword === ''  ? <li>please enter new password</li> : null}
              {myState.newPassword !== myState.reNewPassword  ? <li>password is not matching the repassword</li> : null}
            </ul>
          )
          setMyState({
            ...myState,
            modalElement: errorElement,
            showModal: true,
            modalTitle: 'Entries Errors',
            modalClass: 'bg-danger'
          })
        } else {
          changePasswordPost(myState.oldPassword, myState.newPassword, myState.reNewPassword).then(data => {
              console.log(data)
            switch (data) {
              case 1:
                setMyState({
                  ...myState,
                  modalElement: <p>the new password successfuly</p>,
                  showModal: true,
                  modalTitle: 'Success',
                  modalClass: 'bg-success'
                })
                break;
              case 2:
                setMyState({
                    ...myState,
                    modalElement: <p>Some Entries not right</p>,
                    showModal: true,
                    modalTitle: 'Entries Error',
                    modalClass: 'bg-danger'
                  })
                  break;
                case 3:
                setMyState({
                      ...myState,
                      modalElement: <p>password already exist</p>,
                      showModal: true,
                      modalTitle: 'Title Error',
                      modalClass: 'bg-danger'
                    })
                    break;
                case 4:
                setMyState({
                      ...myState,
                      modalElement: <p>Server Error please contact the Adminstrator</p>,
                      showModal: true,
                      modalTitle: 'Server Error',
                      modalClass: 'bg-danger'
                    })
                    break;
                case 10:
                  history.push('/')
                  break;
              default:
                break;
            }
          }).catch(error => {
            setMyState({
              ...myState,
              modalElement: <p>Can not send the data to server</p>,
              showModal: true,
              modalTitle: 'Sending Error',
              modalClass: 'bg-danger'
            })
          })
        }
  }
  const closeModal = () => {
    setMyState({
      ...myState,
      showModal: false
    })
  }
    
        return (
            <React.Fragment>
            <div className="content-wrapper">
                 <PopUpModal 
        show={myState.showModal} 
        close={closeModal} 
        className={myState.modalClass}
        title={myState.modalTitle}
        >
          {myState.modalElement}
        </PopUpModal>
      <div className="breadcrumb">
        <div className="container">
          <Link className="breadcrumb-item" to="/home">Dashboard</Link>
          <span className="breadcrumb-item active">Reset Password</span>
        </div>
      </div>
      <section className="static about-sec">
        <div className="container">
          <h1>Reset password</h1>
          
          <div className="form">
            <form>
            <div className="col-md-4">
                <input
                  value={myState.oldPassword}
                  onChange={e => {
                  setMyState({
                    ...myState,
                    oldPassword: e.target.value                   
                  })
                }}
                  id="oldPasswordInp"
                  type="text"
                  className="form-control"
                  placeholder="old password"
                  />
              </div>
              <div className="col-md-4">
                <input
                  value={myState.newPassword}
                  onChange={e => {
                  setMyState({
                    ...myState,
                    newPassword: e.target.value                   
                  })
                }}
                  id="newPasswordInp"
                  type="text"
                  className="form-control"
                  placeholder="New password"
                  />
              </div>
              <div className="col-md-4">
                
                <input
                  value={myState.reNewPassword}
                  onChange={e => {
                  setMyState({
                    ...myState,
                    reNewPassword: e.target.value
                  })
                }}
                  id="reNewPasswordInp"
                  type="text"
                  className="form-control"
                  placeholder="Repeat password"
                  />
              </div>
              <button onClick={passwordSaveBtnClick} className="btn btn-success mt-3">save</button>
            </form>
          </div>
        </div>
      </section>
      </div>
            </React.Fragment>
        );
    
}

export default PassWordReset;