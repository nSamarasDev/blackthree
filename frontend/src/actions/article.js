import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLE,
  CLEAR_ARTICLE,
  ARTICLE_ERROR,
  UPDATE_ARTICLE_LIKES,
  ADD_ARTICLE_COMMENT,
  REMOVE_ARTICLE_COMMENT,
} from './types';

// Get current users profile
export const getCurrentArticle = () => async (dispatch) => {
  dispatch({ type: CLEAR_ARTICLE });

  try {
    const res = await axios.get("api/profile/me");

    dispatch({
      type: GET_ARTICLE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: CLEAR_ARTICLE });

    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get articless
export const getArticles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/article');

    dispatch({
      type: GET_ARTICLES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get article
export const getArticleById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/article/${id}`);

    dispatch({
      type: GET_ARTICLE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add like
export const addLike = (articleId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/article/like/${articleId}`);

    dispatch({
      type: UPDATE_ARTICLE_LIKES,
      payload: { articleId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (articleId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/article/unlike/${articleId}`);

    dispatch({
      type: UPDATE_ARTICLE_LIKES,
      payload: { articleId, likes: res.data },
    });

    dispatch(setAlert('Like removed', 'success'))
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete article
export const deleteArticle = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/article/${id}`);

    dispatch({
      type: DELETE_ARTICLE,
      payload: id,
    });

    dispatch(setAlert('Article Removed', 'success'));
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add article
// Create or update article
export const addArticle =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/article", formData, config);

      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Article Updated" : "Article created", "success")
      );

      if (!edit) {
        history.push("/article");
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: ARTICLE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// Add article comment
export const addArticleComment = (articleId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.article(
      `/api/article/comment/${articleId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_ARTICLE_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Comment
export const deleteArticleComment = (articleId, commentArticleId) => async (dispatch) => {
  try {
    await axios.delete(`/api/article/comment/${articleId}/${commentArticleId}`);

    dispatch({
      type: REMOVE_ARTICLE_COMMENT,
      payload: articleId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};