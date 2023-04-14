import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { usePrams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'


const Profile = props => {
  return (
    <>
    <section className='container'>
        <h1>Tomorrow</h1>
    </section>
    </>
  )
}

Profile.propTypes = {

}

export default Profile

