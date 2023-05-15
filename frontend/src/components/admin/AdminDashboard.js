import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import { getProfiles } from "../../actions/profile";
import { getContacts } from "../../actions/contact";
import { getArticles } from "../../actions/article";
import AdminActions from "./AdminActions";
import ProfileItem from "./ProfileItem";
import ContactItem from "./ContactItem";
import ArticleItem from "./ArticleItem";



const AdminDashboard = ({
  getProfiles,
  getContacts,
  getArticles,
  auth: { user },
  profile: { profiles, loading },
  contact: { contacts, loading: contactLoading },
  article: { articles, loading: articleLoading },
}) => {
  useEffect(() => {
    getProfiles();
    getContacts();
    getArticles();
  }, [getProfiles, getContacts, getArticles]);

  return loading || !contacts ? (
    <Spinner />
  ) : (
    <>
      <section className="container">
      <Alert />
      <div className="admin-container">
    <div>
      <h3 className="large text-primary">Admin Dashboard</h3>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      <AdminActions />
    </div>
     </div>
        <section className="dashboard-container">
          <h1 className="large text-dark">Profile list</h1>
          <hr />
          <table
            className="table"
            style={{ paddingTop: "40px", paddingBottom: "40px" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Company</th>
                <th className="hide-sm">Website</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody
              className="dashboard-table-body"
              style={{ backgroundColor: "#333", color: "#fff" }}
            >
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <tr>
                  <td>No profiles found</td>
                </tr>
              )}
            </tbody>
          </table>
          <hr />
          <h1 className="large text-dark" style={{ paddingTop: "50px" }}>
            Contact list
          </h1>
          <table className="table" style={{ paddingTop: "10px", paddingBottom: '40px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Email</th>
                <th className="hide-sm">Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody
              className="dashboard-table-body"
              style={{ backgroundColor: "#333", color: "#fff" }}
            >
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <ContactItem key={contact._id} contact={contact} />
                ))
              ) : (
                <tr>
                  <td>No contacts found</td>
                </tr>
              )}
            </tbody>
          </table>
          <hr />
          <h1 className="large text-dark" style={{ paddingTop: "50px" }}>
            Article list
          </h1>
          <table className="table" style={{ paddingTop: "10px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Article Title</th>
                <th className="hide-sm">ID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody
              className="dashboard-table-body tr"
              style={{ backgroundColor: "#333", color: "#fff" }}
            >
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleItem key={article._id} article={article} />
                ))
              ) : (
                <tr>
                  <td>No articles found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

AdminDashboard.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    getContacts: PropTypes.func.isRequired,
    getArticles: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    contact: state.contact,
    article: state.article,
  });
  
  export default connect(mapStateToProps, { getProfiles, getContacts, getArticles } )(AdminDashboard)
