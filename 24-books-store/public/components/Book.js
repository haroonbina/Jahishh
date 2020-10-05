import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

import {getBookPost} from '../services/api'

import ImageGallery from 'react-image-gallery';

const Book = () => {
  const params = useParams()
  //console.log(params);

  const intialState = {
    book: null
  }
  const [state,
    setState] = useState(intialState)

  useEffect(() => {
    getBookPost(params.id).then(data => {
      if(data != 2){
        setState({
        ...state,
        book: data
      })
      }
      
    })
  }, [])
  if (state.book) {
    const imagesSet = state.book.imgs.map(image => {
        return ({original: image, thumbnail: image})
      })
    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
            <Link className="breadcrumb-item" to="/">Home</Link>
            <span className="breadcrumb-item active">{state.book.title}</span>
          </div>
        </div>
        <section className="product-sec">
          <div className="container">
            <h1>{state.book.title}</h1>
            <div className="row">
              <div className="col-md-6 slider-sec">
                <ImageGallery
                  items={imagesSet}
                  thumbnailPosition="right"
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={false}/>
              </div>
              <div className="col-md-6 slider-content">
                {state.book.description}

                <div className="btn-sec">
                  {state.book.pdfUrl != null
                    ? <a href={state.book.pdfUrl} target="_blank" className="btn btn-success">download</a>
                    : <Link to="/login" className="btn btn-success">Login for Download</Link>}

                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  } else {
    return (
      <div>Loading ...</div>
    )
  }
}

export default Book