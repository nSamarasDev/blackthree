import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ContactTop = ({
    contact: {
        identifiers: { alt_id, resource_id },
        name,
        email,
        description,
        date,
      },
}) => {
  return (
    <div className='post-text'>
    <div className='post-text bg-dark p-1 my-1'>
      <p className='post-date'>Posted {date ? formatDate(date) : 'Now'}</p>
      <p>{email && <span>{email}</span>}</p>
      <p>{name}</p>
      <p>{description}</p>
      <p style={{textAlign: 'left'}}>{alt_id}</p>
      <p style={{textAlign: 'left'}}>{resource_id}</p>
    </div>
    </div>
  )
}

ContactTop.propTypes = {
    contact: PropTypes.object.isRequired,
  };

export default ContactTop
