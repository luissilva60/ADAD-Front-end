import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  AppConfig,
  UserSession,
  AuthDetails,
  showConnect,
} from "@stacks/connect";
import { useState, useEffect } from "react";
import { userSession } from './auth';

import 'bootstrap/dist/css/bootstrap.css';
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Users from "./pages/Users";
import Movie from "./pages/Movie";
import Footer from './components/Footer';
import Map from './pages/Map'
import User from './pages/User'
import React from 'react';
import Login from './pages/Login'
import MovieRating from './pages/MovieRating'
import Profile from './pages/Profile'


function App() {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/users" element={<Users />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/map" element={<Map />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movierating/:id" element={<MovieRating />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
    
  );
}

export default App;
