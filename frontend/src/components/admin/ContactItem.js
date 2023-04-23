import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' 
import { deleteContact } from '../../actions/contact'
import PropTypes from "prop-types";

const ContactItem = ({
  deleteContact,
  contact: {
    _id,
    name,
    email,
    description,
  },
}) => (
  <tr>
    <td>{name}</td>
    <td className="hide-sm">{email}</td>
    <td className="hide-sm">{description}</td>
    <td>
      <button className="btn btn-danger" onClick={() => deleteContact(_id)}>Delete</button>
    </td>
    <td>
      <Link to={`/contact/${_id}`} className='btn btn-primary'>
        View 
      </Link>
    </td>
  </tr>
);

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default connect(null, { deleteContact })(ContactItem);
