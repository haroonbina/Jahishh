import React, {useState, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import PopUpModal from './PopUpModal'
import {addBookPost} from '../services/api'

const AddBook = () => {

const history = useHistory()

  const intialState = {
    bookTitle: '',
    bookDescription: '',
    modalElement: null,
    showModal: false,
    modalTitle: '',
    modalClass: 'bg-danger'
  }
  const [state,
    setState] = useState(intialState)

  const pdfFileInpRef = useRef()
  const imagesFileInpRef = useRef()


  const bookSaveBtnClick = e => {
    e.preventDefault()
    if (state.bookTitle.trim() ==='' || 
        state.bookDescription.trim() === '' || 
        pdfFileInpRef.current.files.length === 0 || 
        imagesFileInpRef.current.files.length === 0){
          const errorElement = (
            <ul>
              {state.bookTitle.trim() ==='' ? <li>please enter book title</li> : null}
              {state.bookDescription.trim() === ''  ? <li>please enter book Description</li> : null}
              {pdfFileInpRef.current.files.length === 0  ? <li>please upload the book pdf file</li> : null}
              {imagesFileInpRef.current.files.length === 0  ? <li>please upload at least one Image</li> : null}
            </ul>
          )
          setState({
            ...state,
            modalElement: errorElement,
            showModal: true,
            modalTitle: 'Entries Errors',
            modalClass: 'bg-danger'
          })
        } else {
          addBookPost(state.bookTitle, state.bookDescription, pdfFileInpRef.current.files[0], imagesFileInpRef.current.files).then(data => {
            switch (data) {
              case 1:
                setState({
                  ...state,
                  modalElement: <p>the book saved successfuly</p>,
                  showModal: true,
                  modalTitle: 'Success',
                  modalClass: 'bg-success'
                })
                break;
              case 2:
                setState({
                    ...state,
                    modalElement: <p>Some Entries not right</p>,
                    showModal: true,
                    modalTitle: 'Entries Error',
                    modalClass: 'bg-danger'
                  })
                  break;
                case 3:
                setState({
                      ...state,
                      modalElement: <p>Book Title is already exist</p>,
                      showModal: true,
                      modalTitle: 'Title Error',
                      modalClass: 'bg-danger'
                    })
                    break;
                case 4:
                setState({
                      ...state,
                      modalElement: <p>Server Error pleasecontact the Adminstrator</p>,
                      showModal: true,
                      modalTitle: 'Server Error',
                      modalClass: 'bg-danger'
                    })
                    break;
                case 10:
                  history.push('/login')
                  break;
              default:
                break;
            }
          }).catch(error => {
            setState({
              ...state,
              modalElement: <p>Can not send the data to server</p>,
              showModal: true,
              modalTitle: 'Sending Error',
              modalClass: 'bg-danger'
            })
          })
        }
  }
  const closeModal = () => {
    setState({
      ...state,
      showModal: false
    })
  }
  return (
    <React.Fragment>
      <PopUpModal 
        show={state.showModal} 
        close={closeModal} 
        className={state.modalClass}
        title={state.modalTitle}
        >
          {state.modalElement}
        </PopUpModal>
      <div className="breadcrumb">
        <div className="container">
          <Link className="breadcrumb-item" to="/admin">Dashboard</Link>
          <span className="breadcrumb-item active">Add Book</span>
        </div>
      </div>
      <section className="static about-sec">
        <div className="container">
          <h1>My Account / Add Book</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only fiveLorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
          </p>
          <div className="form">
            <form>
              <div className="form-group">
                <label htmlFor="bookTitleInp">Book Title</label>
                <input
                  value={state.bookTitle}
                  onChange={e => {
                  setState({
                    ...state,
                    bookTitle: e.target.value
                  })
                }}
                  id="bookTitleInp"
                  type="text"
                  className="form-control"
                  placeholder="Book Title"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Book Images</label>
                <input
                  ref={imagesFileInpRef}
                  id="exampleFormControlFile1"
                  type="file"
                  className="form-control-file"
                  multiple
                  accept="image/x-png,image/gif,image/jpeg"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Book PDF</label>
                <input
                  ref={pdfFileInpRef}
                  id="exampleFormControlFile1"
                  type="file"
                  className="form-control-file"
                  accept="application/pdf"/>
              </div>
              <div className="form-group">
                <label htmlFor="bookDescriptionInp">Book Description</label>
                <textarea
                  value={state.bookDescription}
                  onChange={e => {
                  setState({
                    ...state,
                    bookDescription: e.target.value
                  })
                }}
                  className="form-control"
                  id="bookDescriptionInp"></textarea>
              </div>
              <button onClick={bookSaveBtnClick} className="btn btn-success mt-3">save</button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default AddBook