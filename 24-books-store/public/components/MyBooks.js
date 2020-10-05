import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {myBooksPost, deleteBookPost} from '../services/api'
import ConfirmModal from './ConfirmModal'
const MyBooks = () => {


  const history = useHistory()

  const intialState = {
    books: [],
    confirmModalShow: false,
    confirmModalElement: null,
    confirmModalPayLoad: null
  }
  const [state,
    setState] = useState(intialState)


    


  useEffect(() => {
    myBooksPost().then(data => {
      switch (data) {
        case 10:
          history.push('/login')
          break;
        case 2:
            console.log('server error')
            break;
        default:
          setState({...state, books: data})
          break;
      }
      
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const closeConfirmModal = () => {
      
    setState({
      ...state,
      confirmModalShow: false
    })
  }

  const deleteConfirm = bookid => {
      //console.log(bookid)
      deleteBookPost(bookid).then(data => {

        switch (data) {
          case 10:
            history.push('/login')
            break;
          case 2:
              console.log('server error');
              break;
          default:
            const newBooks = [...state.books]
          newBooks.splice(newBooks.indexOf(newBooks.find(element => element._id === bookid)), 1)
          setState({
            ...state,
            books: newBooks,
            confirmModalShow: false
          })
            break;
        }
        
      })
  }

  const deleteBtnClick = (bookId) => {
    setState({
        ...state,
        confirmModalShow: true,
        confirmModalPayLoad: bookId,
        confirmModalElement: <p>I hope you know what you are doing , this book gonna be deleted for ever</p>
      })
}

const booksElement = state.books.map(book => {
  return (
    <div key={book._id} className="col-md-3">
      <div className="item">
        <img className="bookimage" src={book.imgs[0]} alt="img"/>
        <h3>
          <Link to={"/admin/mybook/" + book._id}>{book.title}</Link>
        </h3>
        <h6>
          <Link to={"/admin/mybook/" + book._id}>Edit</Link>
          &nbsp;&nbsp;&nbsp;<button onClick={(e)=>{deleteBtnClick(book._id)}} className="btn btn-danger">Delete</button>
        </h6>
      </div>
    </div>
  )
})

return (
    <React.Fragment>
      <ConfirmModal
        className="bg-danger"
        show={state.confirmModalShow}
        close={closeConfirmModal}
        title="Confirm Delete"
        payload={state.confirmModalPayLoad}
        onConfirm={deleteConfirm}
        >
            {state.confirmModalElement}
        </ConfirmModal>
      <div className="breadcrumb">
        <div className="container">
          <Link className="breadcrumb-item" to="/admin">Dashboard</Link>
          <span className="breadcrumb-item active">My Books</span>
        </div>
      </div>
      <section className="static about-sec">
        <div className="container">

          <h2>My books</h2>
          <div className="recent-book-sec">
            <div className="row">

              {booksElement}

            </div>
            <div className="btn-sec">
              <button className="btn gray-btn">load More books</button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default MyBooks