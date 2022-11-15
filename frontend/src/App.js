import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage'; 
import DonateFood from './components/DonateFood/DonateFood';
import AllFood from './components/AllFood/AllFood';
import Navbar from './components/NavBar/Navbar';
import { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Footer from './components/Footer/Footer';
import FoodDetails from './components/FoodDetails/FoodDetails';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(token != null){
      let user = jwt_decode(token);
      getUser(user.user.id);
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
      getUser(user.user.id)

    }

  })
  .catch(err => {
    console.log(err);
  })
}

const getUser = (id) =>{
  axios.get(`http://localhost:4000/users/${id}`)
  .then(res => {
      setUser(res.data);
      setIsAuth(true);
  })
  .catch(err => console.log(err))
}

const onSubmitHandler = (formData) =>{
  axios.post(`http://localhost:4000/users/${user._id}`, formData)
  .then(res => {
      getUser(res.data._id);
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
      alert(err.response.data.message)
    });
};

const onLogoutHandler = (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  setIsAuth(false);
  setUser(null);
}


//Add a new Food donation
const donationHandler = (food) => {
  const token = localStorage.getItem('token')
  if (token) {
    axios
      .post("http://localhost:4000/food", food, {
        headers: {Authorization: token}
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

  return (
    <Router>
    <div className="App">
    <Navbar onLogoutHandler={onLogoutHandler} onSubmitHandler={onSubmitHandler} isAuth={isAuth} user={user}></Navbar>
      <Routes>
      <Route path="/home" element={<HomePage/>} />
        <Route path="/signup" element={<Signup register={registerHandler}/>} />
        <Route path="/login" element={isAuth? <HomePage/> : <Login login={loginHandler}/>} />
        {/* <Route path="/food/new" element={ <Food donate={donationHandler}/>} />         */}
        <Route path="/food" element={isAuth? <AllFood/> : <Login login={loginHandler}/>} />
        <Route path="/donate" element={isAuth? <DonateFood donate={donationHandler} /> : <Login login={loginHandler}/> } />

        <Route path="/fooddetails/:id" element={isAuth? <FoodDetails /> : <Login login={loginHandler}/>} />
      </Routes>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
