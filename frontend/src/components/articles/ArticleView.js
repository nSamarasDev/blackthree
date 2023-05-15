import React from 'react'
import PropTypes from 'prop-types'

const ArticleView = ({
    article: {
        article,
        content,
    }
}) => {
  return (
    <div className='profile-about2 bg-dark p-2'>
      <h1>{article}</h1>
      <div style={{paddingTop: '10px'}}>{content}</div>
    </div>
  )
}

ArticleView.propTypes = {
 article: PropTypes.object.isRequired,
}

export default ArticleView
