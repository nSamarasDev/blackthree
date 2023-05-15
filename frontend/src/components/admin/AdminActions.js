import React from "react";
import { Link } from "react-router-dom";

const AdminActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-primary">
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-primary">
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-primary">
        Add Education
      </Link>
      <Link to="/article" className="btn btn-primary">
        Write your article
      </Link>
      <Link to="/qiskit" className="btn btn-primary">
        Quantum Dashboard
      </Link>
      
    </div>
  );
};

export default AdminActions;