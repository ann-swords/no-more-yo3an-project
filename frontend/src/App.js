import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage'; 
import Food from './components/CreateFood/Food';
import AllFood from './components/AllFood/AllFood';

import { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";



function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});


  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(token != null){
      let user = jwt_decode(token);

      if(user){
        setIsAuth(true);
        setUser(user);
      }else if(!user){
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  },[])



const loginHandler = (cred) =>{
  axios.post("http://localhost:4000/auth/signin", cred)
  .then(res =>{
    if(res.data.token != null){
      localStorage.setItem("token", res.data.token);
      let user = jwt_decode(res.data.token);
      setIsAuth(true);
      setUser(user);
    }
  })
  .catch(err => {
    console.log(err);
  })
}


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


//Add a new Food donation
const donationHandler = (food) => {
  axios
    .post("http://localhost:4000/food", food)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="*" element={isAuth? <HomePage></HomePage> : <Login login={loginHandler}/>} />
        <Route path="/signup" element={<Signup register={registerHandler}/>} />
`
        <Route path="/login" element={ <Login login={loginHandler}/>} />
        <Route path="/donate" element={ <Food donate={donationHandler}/>} />






        
        <Route path="/allfood" element={ <AllFood/>} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
