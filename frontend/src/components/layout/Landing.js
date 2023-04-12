import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Landing = props => {
  return (
    <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Random Layout</h1>
            <p className="lead">
              Connect with like minds and share the experience
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
              <Link to="/contact" className="btn btn-primary">
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
}

Landing.propTypes = {

}

export default Landing
