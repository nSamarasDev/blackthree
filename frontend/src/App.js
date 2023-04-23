import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { loadUser } from "./actions/auth";
import Cookies from 'js-cookie'
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Contact from './components/contact-form/CreateContact'
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import ContactView from './components/admin/ContactView'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

const token = Cookies.get('token');

if (token) {
  setAuthToken(token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return <Router>
    <Navbar />
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profiles" element={<Profiles />} />
    <Route path="/profile/user/:id" element={<Profile />} />

    <Route /////////////  Profile Routes  ////////////////
      path="/create-profile"
      element={<PrivateRoute component={CreateProfile} />}    
    />

    <Route
          path="/edit-profile"
          element={<PrivateRoute component={EditProfile} />}
    />

    <Route
          path="/add-experience"
          element={<PrivateRoute component={AddExperience} />}
    />

    <Route
          path="/add-education"
          element={<PrivateRoute component={AddEducation} />}
    />

    <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
    />

    <Route /////////////  Post Routes  ////////////////
          path='/posts'
          element={<PrivateRoute component={Posts} />}
    />

    <Route path='/post/:id' element={<PrivateRoute component={Post} />} />

    <Route /////////////  Admin Routes  ////////////////
          path='/admin'
          element={<PrivateRoute component={AdminDashboard} />}
    />

     <Route
          path="/contact/:id"
          element={<PrivateRoute component={ContactView} />}
    />
    </Routes>
  <Navbar />
  
</Router>
}

export default App

