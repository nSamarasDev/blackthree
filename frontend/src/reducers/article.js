import {
  DELETE_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLE,
  CLEAR_ARTICLE,
  ARTICLE_ERROR,
  UPDATE_ARTICLE_LIKES,
  ADD_ARTICLE,
  ADD_ARTICLE_COMMENT,
  REMOVE_ARTICLE_COMMENT,
  } from '../actions/types';
  
  const initialState = {
    articles: [],
    article: null,
    loading: true,
    error: {},
  };
  
  export default function reduce (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ARTICLES:
        return {
          ...state,
          articles: payload,
          loading: false,
        };
      case GET_ARTICLE:
        return {
          ...state,
          article: payload,
          loading: false,
        };
      case ADD_ARTICLE:
        return {
          ...state,
          articles: [payload, ...state.articles],
          loading: false,
        };
      case DELETE_ARTICLE:
        return {
          ...state,
          articles: state.articles.filter((article) => article._id !== payload),
          loading: false,
        };
        case CLEAR_ARTICLE:
        return {
          ...state,
          article: null,
          repos: [],
          loading: false,
        };
        case ARTICLE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case UPDATE_ARTICLE_LIKES:
        return {
          ...state,
          articles: state.articles.map((article) =>
            article._id === payload.articleId ? { ...article, likes: payload.likes } : article
          ),
          loading: false,
        };
      case ADD_ARTICLE_COMMENT:
        return {
          ...state,
          article: { ...state.article, comments: payload },
          loading: false,
        };
      case REMOVE_ARTICLE_COMMENT:
        return {
          ...state,
          article: {
            ...state.article,
            comments: state.article.comments.filter(
              (comment) => comment._id !== payload
            ),
          },
          loading: false,
        };
      default:
        return state;
    }
    
  }
  