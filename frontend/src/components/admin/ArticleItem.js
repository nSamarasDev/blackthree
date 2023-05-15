import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' 
import { deleteArticle } from '../../actions/article'
import PropTypes from "prop-types";

const ArticleItem = ({
  deleteArticle,
  article: {
    _id,
    name,
    article,
    content
  },
}) => (
  <tr>
    <td>{name}</td>
    <td className="hide-sm">{article}</td>
    <td className="hide-sm">{_id}</td>
    <td>
      <button className="btn btn-danger" onClick={() => deleteArticle(_id)}>Delete</button>
    </td>
    <td>
      <Link to={`/article/${_id}`} className='btn btn-primary'>
        View 
      </Link>
    </td>
  </tr>
);

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

export default connect(null, { deleteArticle })(ArticleItem);
