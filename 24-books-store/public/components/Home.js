import React from 'react'

import Slider from './Slider'

class Home extends React.Component {
  render() {
    return (
      <section className="slider">
        <div className="container">
            <Slider />
        </div>
      </section>
    )
  }
}

export default Home