import React, {useState, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { addRoomPost } from '../services/api';
import PopUpModal from './PopUpModal';

const AddRoom = () => {
    const history = useHistory()

  const initialState = {
    name: '',
    device_sn: '',
    max_people_number:'',
    current_people_number:'',
    modalElement: null,
    showModal: false,
    modalTitle: '',
    modalClass: 'bg-danger',

  }
  const [myState, setMyState] = useState(initialState);




  const roomSaveBtnClick = e => {
    e.preventDefault()
    if (myState.name.trim() ==='' || 
    myState.device_sn.trim() === '' || myState.max_people_number.trim() === '' || myState.current_people_number.trim() === '' ){
          const errorElement = (
            <ul>
              {myState.name.trim() ==='' ? <li>please enter Room no</li> : null}
              {myState.device_sn.trim() === ''  ? <li>please enter device serial number</li> : null}
              {myState.max_people_number.trim() ==='' ? <li>please enter Max People Number</li> : null}
              {myState.current_people_number.trim() ==='' ? <li>please enter Current People Number</li> : null}
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
          addRoomPost(myState.name, myState.device_sn, myState.max_people_number, myState.current_people_number).then(data => {
              console.log(data)
            switch (data) {
              case 1:
                setMyState({
                  ...myState,
                  modalElement: <p>the Room saved successfuly</p>,
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
                      modalElement: <p>Room number already exist</p>,
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
        <ol className="breadcrumb ">
            <Link className="breadcrumb-item" to="/home">Home</Link>
              <li className="breadcrumb-item active">Add Room</li>
            </ol>
          
        </div>
      </div>
      <section className="static about-sec">
        <div className="container">
          <h1>Add Room</h1>
          
          <div className="form">
            <form>
              <div className="form-group">
                <label htmlFor="roomNumberInp">Room no </label>
                <input
                  value={myState.rooms}
                  onChange={e => {
                  setMyState({
                    ...myState,
                    name: e.target.value
                  })
                }}
                  id="roomNumberInp"
                  type="text"
                  className="form-control"
                  placeholder="Room Number"/>
              </div>
              <div className="form-group">
                <label htmlFor="deviceSerialInp">Device serial no</label>
                <textarea
                  value={myState.device_sn}
                  onChange={e => {
                    setMyState({
                    ...myState,
                    device_sn: e.target.value
                  })
                }}
                  className="form-control"
                  id="deviceSerialInp"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="max-p-number">Max People Number</label>
                <textarea
                  value={myState.max_people_number}
                  onChange={e => {
                    setMyState({
                    ...myState,
                    max_people_number: e.target.value
                  })
                }}
                  className="form-control"
                  id="max-p-number"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="current-p-number">Current People Number</label>
                <textarea
                  value={myState.current_people_number}
                  onChange={e => {
                    setMyState({
                    ...myState,
                    current_people_number: e.target.value
                  })
                }}
                  className="form-control"
                  id="current-p-number"></textarea>
              </div>
              <button onClick={roomSaveBtnClick} className="btn btn-success mt-3">save</button>
            </form>
          </div>
        </div>
      </section>
      </div>
            </React.Fragment>
        );
    
}

export default AddRoom;