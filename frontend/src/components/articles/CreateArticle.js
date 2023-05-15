import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import { addArticle } from "../../actions/article";

const CreateArticle = ({ addArticle }) => {
  const [formData, setFormData] = useState({
    article: "",
    content: "",
  });

  const { article, content, } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addArticle(formData);
    console.log(formData)
    setTimeout(() => navigate("/dashboard"), 3000); // Wait for 3 seconds before navigating
  };

  return (
    <>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Write your article</h1>
        <p className="lead">
          <i className="fas fa-user"></i>Publish you results
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="name your article"
              name="article"
              value={article}
              onChange={(e) => onChange(e)}
              required
            />
            <small className="form-text">
              name of your article or blog.
            </small>
          </div>
          <div className="form-group">
            <textarea
             rows="10"
             cols="50"
              type="text"
              placeholder="text-area"
              name="content"
              value={content}
              onChange={(e) => onChange(e)}
              required
            />
            <small className="form-text">
              write your content here then publish the results so you can share your personal link.
            </small>
          </div>
          
          <input type="submit" className="btn btn-primary" value="Publish" />
        </form>
      </section>
    </>
  );
};

CreateArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
};

export default connect(null, { addArticle })(CreateArticle);
