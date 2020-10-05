import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {allBooksPost} from '../services/api'

const Shop = () => {


    const intialState = {
        books: []
    }
    const [state, setState] = useState(intialState)

    useEffect(() => {
        allBooksPost().then(data => {
            if(data != 2){
                setState({...state, books: data})
            }
            
        })
    }, [])

    const booksElement = state.books.map(book => {
        return (
            <div key={book._id} className="col-md-3">
                        <div className="item">
                            <img className="bookimage" src={book.imgs[0]} alt="img" />
                            <h3><Link to={'/book/' + book.title.trim().replace(/ /g, '_') + '/' + book._id}>{book.title}</Link></h3>
                            <h6><Link to={'/book/' + book.title.trim().replace(/ /g, '_') + '/' + book._id}>Download</Link></h6>
                        </div>
                    </div>
        )
    })
    return(
        <React.Fragment>
            <div className="breadcrumb">
        <div className="container">
            <Link className="breadcrumb-item" to="/">Home</Link>
            <span className="breadcrumb-item active">Shop</span>
        </div>
    </div>
    <section className="static about-sec">
        <div className="container">
            <h2>recently added books to our store</h2>
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


export default Shop