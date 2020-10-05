import React from 'react'
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';
import {Link} from 'react-router-dom'

const items = [
  {
    src: '/images/slide1.jpg',
    title1: 'welcome to bookstore',
    title2: 'Discover the best books online with us',
    btnText: 'shop books',
    btnLink: '/'
  }, {
    src: '/images/slide2.jpg',
    title1: 'welcome to bookstore',
    title2: 'Discover the best books online with us',
    btnText: 'shop books',
    btnLink: '/shop'
  }, {
    src: '/images/slide3.jpg',
    title1: 'welcome to bookstore',
    title2: 'Discover the best books online with us',
    btnText: 'shop books',
    btnLink: '/'
  }, {
    src: '/images/slide4.jpg',
    title1: 'welcome to bookstore',
    title2: 'Discover the best books online with us',
    btnText: 'shop books',
    btnLink: '/'
  }
]
class Slider extends React.Component {
  state = {
    activeIndex: 0,
    animating: false
  }
  next = () => {
    if (this.state.animating) {
      return
    }
    const nextIndex = this.state.activeIndex === items.length - 1
      ? 0
      : this.state.activeIndex + 1;
    this.setState({activeIndex: nextIndex})
  }
  previous = () => {
    if (this.state.animating) {
      return
    }
    const nextIndex = this.state.activeIndex === 0
      ? items.length - 1
      : this.state.activeIndex - 1;
    this.setState({activeIndex: nextIndex})

  }
  goToIndex = (newIndex) => {
    if (this.state.animating) {
      return
    }
    this.setState({activeIndex: newIndex})
  }
  render() {
    const slides = items.map((item, idx) => {
      return (
        <CarouselItem
          onExiting={() => this.setState({animating: true})}
          onExited={() => {
          this.setState({animating: false})
        }}
          key={idx}>
          <img src={item.src} alt={item.title1}/>
          <div className="content">
            <div className="title">
              <h3>{item.title1}</h3>
              <h5>{item.title2}</h5>
              <Link to={item.btnLink} className="btn">{item.btnText}</Link>
            </div>
          </div>
          <CarouselCaption captionText={item.title1} captionHeader={item.title2}/>
        </CarouselItem>
      )
    })
    return (
      <Carousel
        activeIndex={this.state.activeIndex}
        next={this.next}
        previous={this.previous}>
        <CarouselIndicators
          items={items}
          activeIndex={this.state.activeIndex}
          onClickHandler={this.goToIndex}/> 
          {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}/>
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}/>
      </Carousel>
    )
  }
}

export default Slider