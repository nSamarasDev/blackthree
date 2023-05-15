import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';

const ArticleTop = ({  
    article: { _id, user, avatar, name, article, content }, 
    getProfileById,
    profile,
}) => {
  useEffect(() => {
    getProfileById(user);
  }, [getProfileById, user]);

  const socialLinks = profile?.social || {};
  const websiteLinks = profile || {};

  return (
    <>
    <div className="profile-top bg-dark p-2" style={{paddingBottom: "1px"}}>
        <img className='round-img my-1' src={avatar} alt='Profile Avatar' />
      <h1 className="large">{name}</h1>
      <h1 className="large"></h1>

      <div className="icons">
      {websiteLinks.website && (
          <a href={profile.website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {socialLinks.twitter && (
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {socialLinks.facebook && (
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {socialLinks.youtube && (
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {socialLinks.instagram && (
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
    </>
  );
};

ArticleTop.propTypes = {
  article: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProfileById })(ArticleTop);
