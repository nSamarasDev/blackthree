import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getArticleById } from '../../actions/article'
import ArticleTop from './ArticleTop'
import ArticleView from './ArticleView'

const Article = ({
    getArticleById,
    article: { article, loading },
    auth,
}) => {

    const { id } = useParams()

    useEffect(() => {
        getArticleById(id);
    }, [getArticleById, id])

  return (
    <>
     <section className='container'>
        {article === null || loading ? (
            <Spinner />
        ) : (
            <Fragment>
                <Link to='/dashboard' className='btn btn-light'>
                   Back 
                </Link>
                {auth.isAuthenticated &&
                auth.loading === false &&
               auth.user._id === article.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Article
              </Link>
            )}

          <div>
            <ArticleTop article={article} />
            <ArticleView article={article} />
          </div>
            </Fragment>
        )}   
    </section> 
    </>
  )
}

Article.propTypes = {
    getArticleById: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    article: state.article,
    auth: state.auth,
  });

export default connect(mapStateToProps, { getArticleById })(Article)