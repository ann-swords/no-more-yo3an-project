import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

import { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

//User Authentication:

//Add a new user:
const registerHandler = (user) => {
  axios
    .post("http://localhost:4000/users", user)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        {/* <Route path="*" element={<HomePage />} /> */}
        <Route path="/signup" element={<Signup register={registerHandler}/>} />
        <Route path="/login" element={ <Login />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
